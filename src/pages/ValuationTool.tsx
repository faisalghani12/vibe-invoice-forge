import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Calculator, BarChart3, DollarSign, Building2, LineChart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ValuationData {
  // Basic Company Info
  companyName: string;
  industry: string;
  
  // Financial Data
  revenue: number;
  netIncome: number;
  ebitda: number;
  totalAssets: number;
  totalLiabilities: number;
  cashFlow: number;
  
  // Market Data
  sharesOutstanding: number;
  discountRate: number;
  growthRate: number;
  
  // Industry Multiples
  peRatio: number;
  evEbitdaMultiple: number;
  revenueMultiple: number;
}

interface ValuationResults {
  assetBased: number;
  dcf: number;
  peValuation: number;
  evEbitda: number;
  revenueMultiple: number;
  bookValue: number;
  averageValuation: number;
  valuationRange: { min: number; max: number };
}

const ValuationTool = () => {
  const [formData, setFormData] = useState<ValuationData>({
    companyName: "",
    industry: "",
    revenue: 0,
    netIncome: 0,
    ebitda: 0,
    totalAssets: 0,
    totalLiabilities: 0,
    cashFlow: 0,
    sharesOutstanding: 0,
    discountRate: 10,
    growthRate: 5,
    peRatio: 15,
    evEbitdaMultiple: 8,
    revenueMultiple: 2
  });

  const [results, setResults] = useState<ValuationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof ValuationData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: keyof ValuationData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateValuation = async () => {
    setIsCalculating(true);
    
    try {
      // Asset-Based Valuation
      const assetBased = Math.max(0, formData.totalAssets - formData.totalLiabilities);
      
      // DCF Valuation (simplified)
      const terminalValue = (formData.cashFlow * (1 + formData.growthRate / 100)) / ((formData.discountRate / 100) - (formData.growthRate / 100));
      const dcf = terminalValue / Math.pow(1 + formData.discountRate / 100, 5);
      
      // P/E Valuation
      const peValuation = formData.netIncome * formData.peRatio;
      
      // EV/EBITDA Valuation
      const evEbitda = formData.ebitda * formData.evEbitdaMultiple;
      
      // Revenue Multiple Valuation
      const revenueMultiple = formData.revenue * formData.revenueMultiple;
      
      // Book Value
      const bookValue = assetBased;
      
      // Calculate averages and ranges
      const valuations = [assetBased, dcf, peValuation, evEbitda, revenueMultiple].filter(v => v > 0);
      const averageValuation = valuations.reduce((sum, val) => sum + val, 0) / valuations.length;
      const minVal = Math.min(...valuations);
      const maxVal = Math.max(...valuations);
      
      const calculatedResults: ValuationResults = {
        assetBased,
        dcf,
        peValuation,
        evEbitda,
        revenueMultiple,
        bookValue,
        averageValuation,
        valuationRange: { min: minVal, max: maxVal }
      };
      
      setResults(calculatedResults);
      toast({
        title: "Valuation Complete",
        description: `Business valuation calculated using 5 different methods`
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your inputs and try again",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const industries = [
    "Technology", "Healthcare", "Finance", "Manufacturing", "Retail",
    "Real Estate", "Energy", "Transportation", "Education", "Hospitality",
    "Agriculture", "Construction", "Media", "Telecommunications", "Other"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Valuation Tool</h1>
          <p className="text-muted-foreground">Estimate business value using multiple proven methods</p>
        </div>
      </div>

      <Tabs defaultValue="input" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input Data</TabsTrigger>
          <TabsTrigger value="results" disabled={!results}>Valuation Results</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleInputChange('companyName')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={handleSelectChange('industry')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Financial Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Annual Revenue ($)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      placeholder="0"
                      value={formData.revenue || ''}
                      onChange={handleInputChange('revenue')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="netIncome">Net Income ($)</Label>
                    <Input
                      id="netIncome"
                      type="number"
                      placeholder="0"
                      value={formData.netIncome || ''}
                      onChange={handleInputChange('netIncome')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ebitda">EBITDA ($)</Label>
                    <Input
                      id="ebitda"
                      type="number"
                      placeholder="0"
                      value={formData.ebitda || ''}
                      onChange={handleInputChange('ebitda')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cashFlow">Cash Flow ($)</Label>
                    <Input
                      id="cashFlow"
                      type="number"
                      placeholder="0"
                      value={formData.cashFlow || ''}
                      onChange={handleInputChange('cashFlow')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Balance Sheet Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Balance Sheet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalAssets">Total Assets ($)</Label>
                    <Input
                      id="totalAssets"
                      type="number"
                      placeholder="0"
                      value={formData.totalAssets || ''}
                      onChange={handleInputChange('totalAssets')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalLiabilities">Total Liabilities ($)</Label>
                    <Input
                      id="totalLiabilities"
                      type="number"
                      placeholder="0"
                      value={formData.totalLiabilities || ''}
                      onChange={handleInputChange('totalLiabilities')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sharesOutstanding">Shares Outstanding</Label>
                    <Input
                      id="sharesOutstanding"
                      type="number"
                      placeholder="0"
                      value={formData.sharesOutstanding || ''}
                      onChange={handleInputChange('sharesOutstanding')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Valuation Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Valuation Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discountRate">Discount Rate (%)</Label>
                    <Input
                      id="discountRate"
                      type="number"
                      step="0.1"
                      placeholder="10"
                      value={formData.discountRate || ''}
                      onChange={handleInputChange('discountRate')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="growthRate">Growth Rate (%)</Label>
                    <Input
                      id="growthRate"
                      type="number"
                      step="0.1"
                      placeholder="5"
                      value={formData.growthRate || ''}
                      onChange={handleInputChange('growthRate')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="peRatio">P/E Ratio</Label>
                    <Input
                      id="peRatio"
                      type="number"
                      step="0.1"
                      placeholder="15"
                      value={formData.peRatio || ''}
                      onChange={handleInputChange('peRatio')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="evEbitdaMultiple">EV/EBITDA Multiple</Label>
                    <Input
                      id="evEbitdaMultiple"
                      type="number"
                      step="0.1"
                      placeholder="8"
                      value={formData.evEbitdaMultiple || ''}
                      onChange={handleInputChange('evEbitdaMultiple')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenueMultiple">Revenue Multiple</Label>
                    <Input
                      id="revenueMultiple"
                      type="number"
                      step="0.1"
                      placeholder="2"
                      value={formData.revenueMultiple || ''}
                      onChange={handleInputChange('revenueMultiple')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={calculateValuation}
              disabled={isCalculating || !formData.companyName}
              className="px-8 py-2"
              size="lg"
            >
              <Calculator className="w-4 h-4 mr-2" />
              {isCalculating ? "Calculating..." : "Calculate Valuation"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <>
              {/* Summary Card */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Valuation Summary for {formData.companyName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">
                      {formatCurrency(results.averageValuation)}
                    </div>
                    <p className="text-muted-foreground">Average Valuation</p>
                    <p className="text-sm text-muted-foreground">
                      Range: {formatCurrency(results.valuationRange.min)} - {formatCurrency(results.valuationRange.max)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Asset-Based Valuation</CardTitle>
                    <p className="text-sm text-muted-foreground">Total Assets - Total Liabilities</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.assetBased)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">DCF Valuation</CardTitle>
                    <p className="text-sm text-muted-foreground">Discounted Cash Flow</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.dcf)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">P/E Valuation</CardTitle>
                    <p className="text-sm text-muted-foreground">Net Income × P/E Ratio</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(results.peValuation)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">EV/EBITDA</CardTitle>
                    <p className="text-sm text-muted-foreground">EBITDA × EV/EBITDA Multiple</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(results.evEbitda)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue Multiple</CardTitle>
                    <p className="text-sm text-muted-foreground">Revenue × Revenue Multiple</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-teal-600">
                      {formatCurrency(results.revenueMultiple)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Book Value</CardTitle>
                    <p className="text-sm text-muted-foreground">Shareholders' Equity</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {formatCurrency(results.bookValue)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Methodology Explanation */}
              <Card>
                <CardHeader>
                  <CardTitle>Valuation Methodology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Asset-Based Approach</h4>
                      <p className="text-muted-foreground">Values the company based on its net assets (total assets minus total liabilities).</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">DCF Approach</h4>
                      <p className="text-muted-foreground">Estimates value based on projected future cash flows discounted to present value.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">P/E Multiple</h4>
                      <p className="text-muted-foreground">Uses earnings and industry price-to-earnings ratios to estimate value.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">EV/EBITDA</h4>
                      <p className="text-muted-foreground">Enterprise value based on EBITDA and industry multiples.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Revenue Multiple</h4>
                      <p className="text-muted-foreground">Values the company based on revenue and industry revenue multiples.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Book Value</h4>
                      <p className="text-muted-foreground">Represents the accounting value of shareholders' equity.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ValuationTool;