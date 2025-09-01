import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Calculator, FileText, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface QuickCalculatorProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function QuickCalculator({ trigger, open, onOpenChange }: QuickCalculatorProps) {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    price: 0
  });
  const [taxRate, setTaxRate] = useState(10); // Default 10% tax
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOpenChange = useCallback((open: boolean) => {
    setIsDialogOpen(open);
    onOpenChange?.(open);
  }, [onOpenChange]);

  const addItem = () => {
    if (!newItem.description.trim()) {
      toast({
        title: "Missing Description",
        description: "Please enter a description for the item",
        variant: "destructive"
      });
      return;
    }

    if (newItem.price <= 0) {
      toast({
        title: "Invalid Price",
        description: "Price must be greater than 0",
        variant: "destructive"
      });
      return;
    }

    const item: InvoiceItem = {
      id: Date.now().toString(),
      description: newItem.description,
      quantity: newItem.quantity,
      price: newItem.price,
      total: newItem.quantity * newItem.price
    };

    setItems(prev => [...prev, item]);
    setNewItem({ description: '', quantity: 1, price: 0 });

    toast({
      title: "Item Added",
      description: `${item.description} added to calculation`
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item removed from calculation"
    });
  };

  const clearAll = () => {
    setItems([]);
    setNewItem({ description: '', quantity: 1, price: 0 });
    toast({
      title: "Cleared",
      description: "All items cleared"
    });
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const createInvoiceFromCalculation = () => {
    if (items.length === 0) {
      toast({
        title: "No Items",
        description: "Add some items before creating an invoice",
        variant: "destructive"
      });
      return;
    }

    // Store calculation data in localStorage for the invoice editor
    const calculationData = {
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.price,
        amount: item.total
      })),
      taxRate,
      subtotal,
      taxAmount,
      total
    };

    localStorage.setItem('quickCalculationData', JSON.stringify(calculationData));
    handleOpenChange(false);
    navigate('/templates');
    
    toast({
      title: "Redirected to Templates",
      description: "Your calculation has been saved. Select a template to create your invoice."
    });
  };

  const dialogContent = (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Quick Calculate
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="e.g., Web Design Services"
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && addItem()}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Math.max(1, parseInt(e.target.value) || 1) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    onKeyDown={(e) => e.key === 'Enter' && addItem()}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={addItem} className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
                {items.length > 0 && (
                  <Button variant="outline" onClick={clearAll}>
                    <X className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No items added yet. Add your first item to get started.
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">${item.total.toFixed(2)}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {items.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calculation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({taxRate}%)</span>
                  <span className="font-mono">${taxAmount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="font-mono">${total.toFixed(2)}</span>
                </div>

                <div className="pt-4">
                  <Button onClick={createInvoiceFromCalculation} className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Invoice from Calculation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DialogContent>
  );

  if (open !== undefined) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {dialogContent}
      </Dialog>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Calculator className="w-4 h-4 mr-2" />
            Quick Calculate
          </Button>
        )}
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}