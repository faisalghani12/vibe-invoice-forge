import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileImage, 
  Scan, 
  Download, 
  Eye,
  X,
  Receipt,
  Calendar,
  DollarSign,
  Store
} from "lucide-react";
import { extractReceiptData } from "@/services/receiptOCR";

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

export const ReceiptScannerForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileDirectly(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Handle file directly instead of creating fake event
      handleFileDirectly(file);
    }
  };

  const handleFileDirectly = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file (PNG, JPG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Reset previous results
    setReceiptData(null);
    setProgress(0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const processReceipt = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const result = await extractReceiptData(selectedFile);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setReceiptData(result);
      
      toast({
        title: "Receipt Processed",
        description: "Successfully extracted data from your receipt!",
      });

    } catch (error) {
      console.error('Error processing receipt:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process the receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const exportToCSV = () => {
    if (!receiptData) return;

    const csvData = [
      ['Field', 'Value'],
      ['Merchant', receiptData.merchant || 'N/A'],
      ['Date', receiptData.date || 'N/A'],
      ['Total', receiptData.total || 'N/A'],
      ['Category', receiptData.category || 'N/A'],
      ['Confidence', `${Math.round(receiptData.confidence * 100)}%`],
      [''],
      ['Items', ''],
    ];

    if (receiptData.items) {
      csvData.push(['Item Name', 'Price', 'Quantity']);
      receiptData.items.forEach(item => {
        csvData.push([item.name, item.price, item.quantity || '1']);
      });
    }

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${Date.now()}.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Receipt data exported to CSV file",
    });
  };

  const clearAll = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setReceiptData(null);
    setProgress(0);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Receipt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {selectedFile ? (
              <div className="space-y-4">
                <FileImage className="w-12 h-12 mx-auto text-primary" />
                <div>
                  <p className="font-medium text-foreground">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    setShowPreview(true);
                  }}>
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    clearAll();
                  }}>
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium text-foreground">
                    Drop your receipt image here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files (PNG, JPG, max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Process Button */}
      {selectedFile && !receiptData && (
        <div className="text-center">
          <Button 
            onClick={processReceipt} 
            disabled={isProcessing}
            size="lg"
            className="min-w-48"
          >
            <Scan className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : "Scan Receipt"}
          </Button>
          
          {isProcessing && (
            <div className="mt-4 space-y-2">
              <Progress value={progress} className="max-w-md mx-auto" />
              <p className="text-sm text-muted-foreground">
                Analyzing receipt with AI...
              </p>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {receiptData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Extracted Data
              </CardTitle>
              <Badge variant="secondary">
                {Math.round(receiptData.confidence * 100)}% confidence
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Store className="w-4 h-4" />
                  Merchant
                </div>
                <p className="font-medium">{receiptData.merchant || 'Not detected'}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Date
                </div>
                <p className="font-medium">{receiptData.date || 'Not detected'}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  Total
                </div>
                <p className="font-medium text-primary">{receiptData.total || 'Not detected'}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  Category
                </div>
                <Badge variant="outline">{receiptData.category || 'General'}</Badge>
              </div>
            </div>

            {/* Items */}
            {receiptData.items && receiptData.items.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Items Detected</h4>
                <div className="space-y-2">
                  {receiptData.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded bg-muted/30">
                      <span className="text-sm">{item.name}</span>
                      <div className="flex items-center gap-2 text-sm">
                        {item.quantity && item.quantity !== '1' && (
                          <Badge variant="secondary" className="text-xs">
                            {item.quantity}x
                          </Badge>
                        )}
                        <span className="font-medium">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Raw Text */}
            <div>
              <h4 className="font-medium mb-2">Raw Extracted Text</h4>
              <div className="bg-muted/30 rounded p-3 text-sm font-mono max-h-32 overflow-y-auto">
                {receiptData.rawText}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button onClick={exportToCSV} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={clearAll} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Preview Modal */}
      {showPreview && previewUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Receipt Preview</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <img 
              src={previewUrl} 
              alt="Receipt preview" 
              className="max-w-full max-h-[70vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};