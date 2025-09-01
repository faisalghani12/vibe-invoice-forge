import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateInvoicePDF, InvoiceData, sampleInvoiceData } from '@/services/pdfGenerator';
import { Download, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InvoiceEditorProps {
  template?: string;
  onClose?: () => void;
}

/**
 * Invoice Editor Component
 * Allows users to create and edit invoice data before generating PDF
 */
export const InvoiceEditor: React.FC<InvoiceEditorProps> = ({ template, onClose }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(sampleInvoiceData);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Load calculation data from localStorage if available
  useEffect(() => {
    const storedCalculationData = localStorage.getItem('quickCalculationData');
    if (storedCalculationData) {
      try {
        const calculationData = JSON.parse(storedCalculationData);
        
        // Update invoice data with calculation data
        setInvoiceData(prev => ({
          ...prev,
          items: calculationData.items,
          subtotal: calculationData.subtotal,
          tax: calculationData.taxAmount,
          total: calculationData.total
        }));
        
        // Clear the stored data after loading
        localStorage.removeItem('quickCalculationData');
        
        toast({
          title: "Calculation Loaded",
          description: "Your calculation has been loaded into the invoice editor."
        });
      } catch (error) {
        console.error('Failed to load calculation data:', error);
      }
    }
  }, [toast]);

  const handleInputChange = (field: string, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFromChange = (field: string, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      from: {
        ...prev.from,
        [field]: value
      }
    }));
  };

  const handleToChange = (field: string, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      to: {
        ...prev.to,
        [field]: value
      }
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setInvoiceData(prev => {
      const items = [...prev.items];
      items[index] = {
        ...items[index],
        [field]: value
      };

      // Recalculate amount if quantity or rate changes
      if (field === 'quantity' || field === 'rate') {
        items[index].amount = items[index].quantity * items[index].rate;
      }

      // Recalculate totals
      const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
      const tax = subtotal * 0.1; // 10% tax rate
      const total = subtotal + tax;

      return {
        ...prev,
        items,
        subtotal,
        tax,
        total
      };
    });
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: '',
          quantity: 1,
          rate: 0,
          amount: 0
        }
      ]
    }));
  };

  const removeItem = (index: number) => {
    setInvoiceData(prev => {
      const items = prev.items.filter((_, i) => i !== index);
      const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax;

      return {
        ...prev,
        items,
        subtotal,
        tax,
        total
      };
    });
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    
    try {
      const templateId = template || 'professional';
      const filename = `${templateId}-invoice.pdf`;
      
      const result = await generateInvoicePDF(invoiceData, filename, templateId);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Invoice PDF generated and downloaded successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to generate PDF",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while generating the PDF",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create Invoice</h1>
          <p className="text-muted-foreground">Fill in the details to generate your professional invoice</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="bg-primary-gradient hover:opacity-90"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate PDF'}
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Invoice Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* From Information */}
        <Card>
          <CardHeader>
            <CardTitle>From (Your Company)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fromName">Company Name</Label>
              <Input
                id="fromName"
                value={invoiceData.from.name}
                onChange={(e) => handleFromChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fromAddress">Address</Label>
              <Input
                id="fromAddress"
                value={invoiceData.from.address}
                onChange={(e) => handleFromChange('address', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fromCity">City</Label>
              <Input
                id="fromCity"
                value={invoiceData.from.city}
                onChange={(e) => handleFromChange('city', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromEmail">Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  value={invoiceData.from.email}
                  onChange={(e) => handleFromChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fromPhone">Phone</Label>
                <Input
                  id="fromPhone"
                  value={invoiceData.from.phone}
                  onChange={(e) => handleFromChange('phone', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* To Information */}
        <Card>
          <CardHeader>
            <CardTitle>Bill To (Client)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="toName">Client Name</Label>
              <Input
                id="toName"
                value={invoiceData.to.name}
                onChange={(e) => handleToChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="toAddress">Address</Label>
              <Input
                id="toAddress"
                value={invoiceData.to.address}
                onChange={(e) => handleToChange('address', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="toCity">City</Label>
              <Input
                id="toCity"
                value={invoiceData.to.city}
                onChange={(e) => handleToChange('city', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="toEmail">Email</Label>
              <Input
                id="toEmail"
                type="email"
                value={invoiceData.to.email}
                onChange={(e) => handleToChange('email', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Payment terms, special instructions, etc."
              value={invoiceData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Invoice Items</CardTitle>
            <Button onClick={addItem} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-5">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Qty</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Rate</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Amount</Label>
                  <Input
                    value={`$${item.amount.toFixed(2)}`}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-end">
              <div className="w-80 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>${invoiceData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">${invoiceData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};