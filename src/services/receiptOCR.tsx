import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

interface ReceiptData {
  rawText: string;
  merchant?: string;
  date?: string;
  total?: string;
  items?: Array<{
    name: string;
    price: string;
    quantity?: string;
  }>;
  category?: string;
  confidence: number;
}

// Initialize OCR pipeline
let ocrPipeline: any = null;

const initializeOCR = async () => {
  if (!ocrPipeline) {
    console.log('Initializing OCR pipeline...');
    ocrPipeline = await pipeline(
      'image-to-text',
      'Xenova/trocr-base-printed',
      { device: 'webgpu' }
    );
    console.log('OCR pipeline initialized');
  }
  return ocrPipeline;
};

// Enhanced text parsing functions
const parseReceiptText = (text: string): Partial<ReceiptData> => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  let merchant: string | undefined;
  let date: string | undefined;
  let total: string | undefined;
  const items: Array<{name: string, price: string, quantity?: string}> = [];
  
  // Patterns for parsing
  const pricePattern = /\$?\d+\.?\d{0,2}/g;
  const datePattern = /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/;
  const totalPattern = /(?:total|amount|sum)[\s:]*\$?(\d+\.?\d{0,2})/i;
  
  // Find merchant (usually first meaningful line)
  if (lines.length > 0) {
    merchant = lines[0];
  }
  
  // Find date
  const dateMatch = text.match(datePattern);
  if (dateMatch) {
    date = dateMatch[0];
  }
  
  // Find total
  const totalMatch = text.match(totalPattern);
  if (totalMatch) {
    total = `$${totalMatch[1]}`;
  } else {
    // Fallback: look for largest price amount
    const prices = text.match(pricePattern) || [];
    if (prices.length > 0) {
      const numericPrices = prices.map(p => parseFloat(p.replace('$', ''))).filter(p => !isNaN(p));
      if (numericPrices.length > 0) {
        total = `$${Math.max(...numericPrices).toFixed(2)}`;
      }
    }
  }
  
  // Parse items (simplified approach)
  for (const line of lines) {
    const priceMatches = line.match(pricePattern);
    if (priceMatches && !line.toLowerCase().includes('total') && line.length > 3) {
      const price = priceMatches[priceMatches.length - 1]; // Take the last price in the line
      const itemName = line.replace(pricePattern, '').trim();
      
      if (itemName.length > 1 && itemName.toLowerCase() !== merchant?.toLowerCase()) {
        items.push({
          name: itemName,
          price: price.startsWith('$') ? price : `$${price}`,
          quantity: '1'
        });
      }
    }
  }
  
  return {
    merchant,
    date,
    total,
    items: items.slice(0, 10), // Limit to first 10 items to avoid noise
  };
};

const categorizeReceipt = (text: string, merchant?: string): string => {
  const lowerText = text.toLowerCase();
  const lowerMerchant = merchant?.toLowerCase() || '';
  
  // Restaurant/Food patterns
  if (lowerText.includes('restaurant') || lowerText.includes('cafe') || 
      lowerText.includes('coffee') || lowerText.includes('pizza') ||
      lowerMerchant.includes('mcdonald') || lowerMerchant.includes('starbucks') ||
      lowerText.includes('food') || lowerText.includes('meal')) {
    return 'Food & Dining';
  }
  
  // Grocery patterns
  if (lowerText.includes('grocery') || lowerText.includes('supermarket') ||
      lowerMerchant.includes('walmart') || lowerMerchant.includes('target') ||
      lowerMerchant.includes('safeway') || lowerText.includes('produce')) {
    return 'Groceries';
  }
  
  // Gas/Fuel patterns
  if (lowerText.includes('gas') || lowerText.includes('fuel') || 
      lowerText.includes('station') || lowerMerchant.includes('shell') ||
      lowerMerchant.includes('exxon') || lowerMerchant.includes('chevron')) {
    return 'Transportation';
  }
  
  // Pharmacy patterns
  if (lowerText.includes('pharmacy') || lowerText.includes('drug') ||
      lowerMerchant.includes('cvs') || lowerMerchant.includes('walgreens')) {
    return 'Healthcare';
  }
  
  // Retail patterns
  if (lowerText.includes('clothing') || lowerText.includes('retail') ||
      lowerText.includes('store') || lowerMerchant.includes('amazon') ||
      lowerMerchant.includes('best buy')) {
    return 'Shopping';
  }
  
  return 'General';
};

export const extractReceiptData = async (imageFile: File): Promise<ReceiptData> => {
  try {
    console.log('Starting receipt processing...');
    
    // Initialize OCR
    const ocr = await initializeOCR();
    
    // Convert file to image URL for processing
    const imageUrl = URL.createObjectURL(imageFile);
    
    // Extract text using OCR
    console.log('Extracting text from image...');
    const result = await ocr(imageUrl);
    
    // Clean up the URL
    URL.revokeObjectURL(imageUrl);
    
    console.log('OCR Result:', result);
    
    // Extract the text from the result
    const rawText = Array.isArray(result) ? 
      result.map(r => r.generated_text || '').join(' ') : 
      (result.generated_text || '');
    
    if (!rawText || rawText.trim().length === 0) {
      throw new Error('No text could be extracted from the image');
    }
    
    console.log('Extracted text:', rawText);
    
    // Parse the extracted text
    const parsedData = parseReceiptText(rawText);
    
    // Categorize the receipt
    const category = categorizeReceipt(rawText, parsedData.merchant);
    
    // Calculate confidence based on how much data we extracted
    let confidence = 0.3; // Base confidence
    if (parsedData.merchant) confidence += 0.2;
    if (parsedData.date) confidence += 0.2;
    if (parsedData.total) confidence += 0.2;
    if (parsedData.items && parsedData.items.length > 0) confidence += 0.1;
    
    const finalData: ReceiptData = {
      rawText,
      merchant: parsedData.merchant,
      date: parsedData.date,
      total: parsedData.total,
      items: parsedData.items,
      category,
      confidence: Math.min(confidence, 1.0)
    };
    
    console.log('Final processed data:', finalData);
    return finalData;
    
  } catch (error) {
    console.error('Error in receipt processing:', error);
    
    // Return a fallback result with error information
    return {
      rawText: `Error processing receipt: ${error instanceof Error ? error.message : 'Unknown error'}`,
      category: 'General',
      confidence: 0.0
    };
  }
};