import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { generateFinancialReport } from "@/services/financialReportGenerator";
import { 
  Plus, 
  Minus, 
  FileBarChart, 
  Download,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar
} from "lucide-react";

interface RevenueItem {
  category: string;
  amount: number;
  description: string;
}

interface ExpenseItem {
  category: string;
  amount: number;
  description: string;
}

interface ReportData {
  companyName: string;
  reportPeriod: string;
  reportType: string;
  revenue: RevenueItem[];
  expenses: ExpenseItem[];
  notes: string;
}

export const FinancialReportForm = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<ReportData>({
    companyName: "",
    reportPeriod: "",
    reportType: "income-statement",
    revenue: [{ category: "Sales", amount: 0, description: "" }],
    expenses: [{ category: "Operating Expenses", amount: 0, description: "" }],
    notes: ""
  });

  const handleInputChange = (field: keyof ReportData, value: string) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const handleRevenueChange = (index: number, field: keyof RevenueItem, value: string | number) => {
    const updatedRevenue = [...reportData.revenue];
    updatedRevenue[index] = { ...updatedRevenue[index], [field]: value };
    setReportData(prev => ({ ...prev, revenue: updatedRevenue }));
  };

  const handleExpenseChange = (index: number, field: keyof ExpenseItem, value: string | number) => {
    const updatedExpenses = [...reportData.expenses];
    updatedExpenses[index] = { ...updatedExpenses[index], [field]: value };
    setReportData(prev => ({ ...prev, expenses: updatedExpenses }));
  };

  const addRevenueItem = () => {
    setReportData(prev => ({
      ...prev,
      revenue: [...prev.revenue, { category: "", amount: 0, description: "" }]
    }));
  };

  const removeRevenueItem = (index: number) => {
    if (reportData.revenue.length > 1) {
      setReportData(prev => ({
        ...prev,
        revenue: prev.revenue.filter((_, i) => i !== index)
      }));
    }
  };

  const addExpenseItem = () => {
    setReportData(prev => ({
      ...prev,
      expenses: [...prev.expenses, { category: "", amount: 0, description: "" }]
    }));
  };

  const removeExpenseItem = (index: number) => {
    if (reportData.expenses.length > 1) {
      setReportData(prev => ({
        ...prev,
        expenses: prev.expenses.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateTotalRevenue = () => {
    return reportData.revenue.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const calculateTotalExpenses = () => {
    return reportData.expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const calculateNetIncome = () => {
    return calculateTotalRevenue() - calculateTotalExpenses();
  };

  const handleGenerateReport = async () => {
    if (!reportData.companyName || !reportData.reportPeriod) {
      toast({
        title: "Missing Information",
        description: "Please fill in company name and report period.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      await generateFinancialReport(reportData);
      toast({
        title: "Report Generated Successfully",
        description: "Your financial report has been generated and downloaded.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Generation Failed", 
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const totalRevenue = calculateTotalRevenue();
  const totalExpenses = calculateTotalExpenses();
  const netIncome = calculateNetIncome();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Total Revenue</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 dark:text-red-400">Total Expenses</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                  ${totalExpenses.toLocaleString()}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${netIncome >= 0 ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' : 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${netIncome >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>Net Income</p>
                <p className={`text-2xl font-bold ${netIncome >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300'}`}>
                  ${netIncome.toLocaleString()}
                </p>
              </div>
              <DollarSign className={`w-8 h-8 ${netIncome >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileBarChart className="w-5 h-5" />
            Financial Report Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={reportData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="Enter company name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportPeriod">Report Period *</Label>
              <Input
                id="reportPeriod"
                value={reportData.reportPeriod}
                onChange={(e) => handleInputChange("reportPeriod", e.target.value)}
                placeholder="e.g., Q1 2024"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportData.reportType} onValueChange={(value) => handleInputChange("reportType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income-statement">Income Statement</SelectItem>
                  <SelectItem value="profit-loss">Profit & Loss</SelectItem>
                  <SelectItem value="cash-flow">Cash Flow Statement</SelectItem>
                  <SelectItem value="financial-summary">Financial Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Revenue and Expenses Tabs */}
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="revenue">Revenue Sources</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Revenue Sources</h3>
                <Button onClick={addRevenueItem} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Revenue
                </Button>
              </div>
              
              <div className="space-y-4">
                {reportData.revenue.map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Category</Label>
                        <Input
                          value={item.category}
                          onChange={(e) => handleRevenueChange(index, "category", e.target.value)}
                          placeholder="Revenue category"
                        />
                      </div>
                      <div>
                        <Label>Amount ($)</Label>
                        <Input
                          type="number"
                          value={item.amount || ""}
                          onChange={(e) => handleRevenueChange(index, "amount", parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => handleRevenueChange(index, "description", e.target.value)}
                          placeholder="Description"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={() => removeRevenueItem(index)}
                          variant="outline"
                          size="sm"
                          disabled={reportData.revenue.length === 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Expenses</h3>
                <Button onClick={addExpenseItem} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </div>
              
              <div className="space-y-4">
                {reportData.expenses.map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Category</Label>
                        <Input
                          value={item.category}
                          onChange={(e) => handleExpenseChange(index, "category", e.target.value)}
                          placeholder="Expense category"
                        />
                      </div>
                      <div>
                        <Label>Amount ($)</Label>
                        <Input
                          type="number"
                          value={item.amount || ""}
                          onChange={(e) => handleExpenseChange(index, "amount", parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => handleExpenseChange(index, "description", e.target.value)}
                          placeholder="Description"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={() => removeExpenseItem(index)}
                          variant="outline"
                          size="sm"
                          disabled={reportData.expenses.length === 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={reportData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Add any additional notes or comments for the report..."
              rows={3}
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              size="lg"
              className="min-w-[200px]"
            >
              {isGenerating ? (
                <>Generating Report...</>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};