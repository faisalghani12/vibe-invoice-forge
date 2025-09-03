import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown,
  Target,
  BarChart3,
  DollarSign,
  Percent,
  AlertCircle,
  CheckCircle,
  Lightbulb
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface CalculationData {
  revenue: number;
  fixedCosts: number;
  variableCostPerUnit: number;
  unitsProduced: number;
  sellingPricePerUnit: number;
  taxRate: number;
}

interface ScenarioData {
  optimistic: number;
  realistic: number;
  pessimistic: number;
}

interface Results {
  totalVariableCosts: number;
  totalCosts: number;
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
  roi: number;
}

export const ProfitLossCalculatorForm = () => {
  const { toast } = useToast();
  const [data, setData] = useState<CalculationData>({
    revenue: 100000,
    fixedCosts: 25000,
    variableCostPerUnit: 15,
    unitsProduced: 1000,
    sellingPricePerUnit: 50,
    taxRate: 25
  });

  const [scenarios, setScenarios] = useState<{
    revenue: ScenarioData;
    costs: ScenarioData;
  }>({
    revenue: { optimistic: 120000, realistic: 100000, pessimistic: 80000 },
    costs: { optimistic: 30000, realistic: 40000, pessimistic: 50000 }
  });

  const [results, setResults] = useState<Results | null>(null);
  const [breakEvenChart, setBreakEvenChart] = useState<any[]>([]);
  const [sensitivityData, setSensitivityData] = useState<any[]>([]);

  // Calculate results
  const calculateResults = () => {
    const totalVariableCosts = data.variableCostPerUnit * data.unitsProduced;
    const totalCosts = data.fixedCosts + totalVariableCosts;
    const grossProfit = data.revenue - totalCosts;
    const netProfit = grossProfit * (1 - data.taxRate / 100);
    const profitMargin = (netProfit / data.revenue) * 100;
    
    // Break-even analysis
    const contributionMarginPerUnit = data.sellingPricePerUnit - data.variableCostPerUnit;
    const breakEvenUnits = contributionMarginPerUnit > 0 ? data.fixedCosts / contributionMarginPerUnit : 0;
    const breakEvenRevenue = breakEvenUnits * data.sellingPricePerUnit;
    
    // ROI calculation
    const roi = data.fixedCosts > 0 ? (netProfit / data.fixedCosts) * 100 : 0;

    return {
      totalVariableCosts,
      totalCosts,
      grossProfit,
      netProfit,
      profitMargin,
      breakEvenUnits: Math.ceil(breakEvenUnits),
      breakEvenRevenue,
      roi
    };
  };

  // Generate break-even chart data
  const generateBreakEvenChart = () => {
    const chartData = [];
    const maxUnits = Math.max(data.unitsProduced * 1.5, results?.breakEvenUnits || 0) * 1.2;
    const step = maxUnits / 10;

    for (let units = 0; units <= maxUnits; units += step) {
      const revenue = units * data.sellingPricePerUnit;
      const totalCosts = data.fixedCosts + (units * data.variableCostPerUnit);
      
      chartData.push({
        units: Math.round(units),
        revenue,
        totalCosts,
        profit: revenue - totalCosts
      });
    }
    
    return chartData;
  };

  // Generate sensitivity analysis data
  const generateSensitivityData = () => {
    if (!results) return [];
    
    const baseProfit = results.netProfit || 0;
    const variations = [-30, -20, -10, 0, 10, 20, 30];
    
    return variations.map(variation => {
      const revenueChange = data.revenue * (1 + variation / 100);
      const costChange = (data.fixedCosts + (data.variableCostPerUnit * data.unitsProduced)) * (1 + variation / 100);
      const newProfit = (revenueChange - costChange) * (1 - data.taxRate / 100);
      
      return {
        variation: `${variation > 0 ? '+' : ''}${variation}%`,
        revenueImpact: newProfit - baseProfit,
        costImpact: baseProfit - ((data.revenue - costChange) * (1 - data.taxRate / 100))
      };
    });
  };

  // Calculate scenario outcomes
  const calculateScenarios = () => {
    return Object.keys(scenarios.revenue).map(scenario => {
      const scenarioRevenue = scenarios.revenue[scenario as keyof ScenarioData];
      const scenarioCosts = scenarios.costs[scenario as keyof ScenarioData];
      const profit = (scenarioRevenue - scenarioCosts) * (1 - data.taxRate / 100);
      
      return {
        scenario: scenario.charAt(0).toUpperCase() + scenario.slice(1),
        revenue: scenarioRevenue,
        costs: scenarioCosts,
        profit,
        margin: (profit / scenarioRevenue) * 100
      };
    });
  };

  // Update calculations when data changes
  useEffect(() => {
    const newResults = calculateResults();
    setResults(newResults);
    setBreakEvenChart(generateBreakEvenChart());
    setSensitivityData(generateSensitivityData());
  }, [data]);

  const handleInputChange = (field: keyof CalculationData, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleScenarioChange = (category: 'revenue' | 'costs', scenario: keyof ScenarioData, value: number) => {
    setScenarios(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [scenario]: value
      }
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const scenarioResults = calculateScenarios();

  return (
    <div className="space-y-6">
      {/* Key Metrics Dashboard */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={`${results.netProfit >= 0 ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${results.netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>Net Profit</p>
                  <p className={`text-2xl font-bold ${results.netProfit >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                    {formatCurrency(results.netProfit)}
                  </p>
                </div>
                {results.netProfit >= 0 ? (
                  <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                ) : (
                  <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Profit Margin</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {results.profitMargin.toFixed(1)}%
                  </p>
                </div>
                <Percent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Break-Even Units</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {results.breakEvenUnits.toLocaleString()}
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">ROI</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {results.roi.toFixed(1)}%
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="breakeven">Break-Even</TabsTrigger>
          <TabsTrigger value="sensitivity">Sensitivity</TabsTrigger>
        </TabsList>

        {/* Main Calculator */}
        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Profit/Loss Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Total Revenue ($)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={data.revenue}
                    onChange={(e) => handleInputChange("revenue", parseFloat(e.target.value) || 0)}
                    placeholder="100000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fixedCosts">Fixed Costs ($)</Label>
                  <Input
                    id="fixedCosts"
                    type="number"
                    value={data.fixedCosts}
                    onChange={(e) => handleInputChange("fixedCosts", parseFloat(e.target.value) || 0)}
                    placeholder="25000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variableCostPerUnit">Variable Cost per Unit ($)</Label>
                  <Input
                    id="variableCostPerUnit"
                    type="number"
                    value={data.variableCostPerUnit}
                    onChange={(e) => handleInputChange("variableCostPerUnit", parseFloat(e.target.value) || 0)}
                    placeholder="15"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unitsProduced">Units Produced</Label>
                  <Input
                    id="unitsProduced"
                    type="number"
                    value={data.unitsProduced}
                    onChange={(e) => handleInputChange("unitsProduced", parseFloat(e.target.value) || 0)}
                    placeholder="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sellingPricePerUnit">Selling Price per Unit ($)</Label>
                  <Input
                    id="sellingPricePerUnit"
                    type="number"
                    value={data.sellingPricePerUnit}
                    onChange={(e) => handleInputChange("sellingPricePerUnit", parseFloat(e.target.value) || 0)}
                    placeholder="50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={data.taxRate}
                    onChange={(e) => handleInputChange("taxRate", parseFloat(e.target.value) || 0)}
                    placeholder="25"
                  />
                </div>
              </div>

              {/* Results Summary */}
              {results && (
                <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Revenue:</span>
                        <span className="font-medium">{formatCurrency(data.revenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fixed Costs:</span>
                        <span className="font-medium">{formatCurrency(data.fixedCosts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Variable Costs:</span>
                        <span className="font-medium">{formatCurrency(results.totalVariableCosts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Costs:</span>
                        <span className="font-medium">{formatCurrency(results.totalCosts)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Gross Profit:</span>
                        <span className={`font-medium ${results.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(results.grossProfit)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Profit (After Tax):</span>
                        <span className={`font-medium ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(results.netProfit)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Break-Even Revenue:</span>
                        <span className="font-medium">{formatCurrency(results.breakEvenRevenue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenario Planning */}
        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Scenario Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Scenarios */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Revenue Scenarios</h3>
                  {Object.entries(scenarios.revenue).map(([scenario, value]) => (
                    <div key={scenario} className="space-y-2">
                      <Label>{scenario.charAt(0).toUpperCase() + scenario.slice(1)} Revenue ($)</Label>
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => handleScenarioChange('revenue', scenario as keyof ScenarioData, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  ))}
                </div>

                {/* Cost Scenarios */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cost Scenarios</h3>
                  {Object.entries(scenarios.costs).map(([scenario, value]) => (
                    <div key={scenario} className="space-y-2">
                      <Label>{scenario.charAt(0).toUpperCase() + scenario.slice(1)} Total Costs ($)</Label>
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => handleScenarioChange('costs', scenario as keyof ScenarioData, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Scenario Results */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Scenario Outcomes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {scenarioResults.map((result, index) => (
                    <Card key={index} className={`${result.profit >= 0 ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'}`}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{result.scenario}</h4>
                            <Badge variant={result.profit >= 0 ? "secondary" : "destructive"}>
                              {result.profit >= 0 ? "Profitable" : "Loss"}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Revenue:</span>
                              <span>{formatCurrency(result.revenue)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Costs:</span>
                              <span>{formatCurrency(result.costs)}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                              <span>Profit:</span>
                              <span className={result.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {formatCurrency(result.profit)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Margin:</span>
                              <span>{result.margin.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Break-Even Analysis */}
        <TabsContent value="breakeven" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Break-Even Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Break-Even Point</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Units to break-even:</span>
                            <span className="font-medium">{results.breakEvenUnits.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Revenue to break-even:</span>
                            <span className="font-medium">{formatCurrency(results.breakEvenRevenue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Current units:</span>
                            <span className="font-medium">{data.unitsProduced.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Units above break-even:</span>
                            <span className={`font-medium ${data.unitsProduced - results.breakEvenUnits >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {(data.unitsProduced - results.breakEvenUnits).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-blue-600" />
                          <h4 className="font-medium text-blue-800 dark:text-blue-200">Insights</h4>
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                          {data.unitsProduced >= results.breakEvenUnits ? (
                            <>
                              <p>✅ You're operating above break-even!</p>
                              <p>💡 Focus on increasing sales volume to maximize profits.</p>
                            </>
                          ) : (
                            <>
                              <p>⚠️ You need {(results.breakEvenUnits - data.unitsProduced).toLocaleString()} more units to break even.</p>
                              <p>💡 Consider reducing costs or increasing price per unit.</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Break-Even Chart</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={breakEvenChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="units" />
                            <YAxis />
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
                            <Line type="monotone" dataKey="totalCosts" stroke="#ef4444" name="Total Costs" />
                            <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sensitivity Analysis */}
        <TabsContent value="sensitivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Sensitivity Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Impact of Changes</h4>
                  <p className="text-sm text-muted-foreground">
                    See how changes in revenue and costs affect your profit
                  </p>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sensitivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="variation" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Bar dataKey="revenueImpact" fill="#3b82f6" name="Revenue Impact" />
                      <Bar dataKey="costImpact" fill="#ef4444" name="Cost Impact" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <h4 className="font-medium text-green-800 dark:text-green-200">Optimization Tips</h4>
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <p>• Focus on increasing revenue - it has a direct impact on profit</p>
                      <p>• Negotiate better rates with suppliers to reduce variable costs</p>
                      <p>• Consider bulk purchasing to lower per-unit costs</p>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <h4 className="font-medium text-orange-800 dark:text-orange-200">Risk Factors</h4>
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                      <p>• Market demand fluctuations can significantly impact revenue</p>
                      <p>• Rising material costs affect your profit margins</p>
                      <p>• Fixed costs remain constant regardless of sales volume</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};