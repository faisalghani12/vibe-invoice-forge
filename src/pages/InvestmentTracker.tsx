import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  Activity,
  Plus,
  Wallet,
  Building2,
  Coins,
  Landmark,
  Home,
  Briefcase,
  BarChart3,
  Calendar
} from "lucide-react";
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Pie } from "recharts";

interface Asset {
  id: string;
  name: string;
  type: 'stocks' | 'crypto' | 'bonds' | 'real-estate' | 'commodities';
  symbol: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  value: number;
  change: number;
  changePercent: number;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  asset: string;
  quantity: number;
  price: number;
  date: string;
  total: number;
}

const InvestmentTracker = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      name: 'Apple Inc.',
      type: 'stocks',
      symbol: 'AAPL',
      quantity: 50,
      avgCost: 180.50,
      currentPrice: 195.30,
      value: 9765,
      change: 740,
      changePercent: 8.2
    },
    {
      id: '2',
      name: 'Bitcoin',
      type: 'crypto',
      symbol: 'BTC',
      quantity: 0.5,
      avgCost: 45000,
      currentPrice: 52000,
      value: 26000,
      change: 3500,
      changePercent: 15.6
    },
    {
      id: '3',
      name: 'US Treasury 10Y',
      type: 'bonds',
      symbol: 'UST10Y',
      quantity: 100,
      avgCost: 95.50,
      currentPrice: 97.20,
      value: 9720,
      change: 170,
      changePercent: 1.8
    },
    {
      id: '4',
      name: 'Downtown Office REIT',
      type: 'real-estate',
      symbol: 'REIT1',
      quantity: 200,
      avgCost: 85.00,
      currentPrice: 78.50,
      value: 15700,
      change: -1300,
      changePercent: -7.6
    }
  ]);

  const [newAsset, setNewAsset] = useState({
    name: '',
    type: 'stocks' as Asset['type'],
    symbol: '',
    quantity: '',
    avgCost: ''
  });

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'buy',
      asset: 'AAPL',
      quantity: 25,
      price: 190.00,
      date: '2024-01-15',
      total: 4750
    },
    {
      id: '2',
      type: 'sell',
      asset: 'BTC',
      quantity: 0.2,
      price: 50000,
      date: '2024-01-14',
      total: 10000
    }
  ]);

  const totalPortfolioValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = assets.reduce((sum, asset) => sum + asset.change, 0);
  const totalChangePercent = ((totalChange / (totalPortfolioValue - totalChange)) * 100);

  const assetAllocation = assets.reduce((acc, asset) => {
    const existing = acc.find(item => item.name === asset.type);
    if (existing) {
      existing.value += asset.value;
    } else {
      acc.push({
        name: asset.type,
        value: asset.value,
        color: getAssetTypeColor(asset.type)
      });
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  const performanceData = [
    { month: 'Jan', value: 58000 },
    { month: 'Feb', value: 59200 },
    { month: 'Mar', value: 57800 },
    { month: 'Apr', value: 61500 },
    { month: 'May', value: 60185 },
    { month: 'Jun', value: totalPortfolioValue }
  ];

  function getAssetTypeColor(type: Asset['type']): string {
    const colors = {
      stocks: 'hsl(234, 89%, 74%)',
      crypto: 'hsl(45, 93%, 58%)',
      bonds: 'hsl(142, 76%, 36%)',
      'real-estate': 'hsl(25, 95%, 53%)',
      commodities: 'hsl(291, 64%, 42%)'
    };
    return colors[type];
  }

  function getAssetTypeIcon(type: Asset['type']) {
    const icons = {
      stocks: BarChart3,
      crypto: Coins,
      bonds: Landmark,
      'real-estate': Home,
      commodities: Briefcase
    };
    return icons[type];
  }

  const addAsset = () => {
    if (newAsset.name && newAsset.symbol && newAsset.quantity && newAsset.avgCost) {
      const quantity = parseFloat(newAsset.quantity);
      const avgCost = parseFloat(newAsset.avgCost);
      const currentPrice = avgCost * (1 + (Math.random() - 0.5) * 0.2); // Simulated current price
      const value = quantity * currentPrice;
      const change = value - (quantity * avgCost);
      const changePercent = (change / (quantity * avgCost)) * 100;

      const asset: Asset = {
        id: Date.now().toString(),
        name: newAsset.name,
        type: newAsset.type,
        symbol: newAsset.symbol.toUpperCase(),
        quantity,
        avgCost,
        currentPrice,
        value,
        change,
        changePercent
      };

      setAssets(prev => [...prev, asset]);
      setNewAsset({ name: '', type: 'stocks', symbol: '', quantity: '', avgCost: '' });
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Investment Tracker</h1>
          <p className="text-muted-foreground">Monitor your multi-asset portfolio performance</p>
        </div>
        <Button className="bg-primary-gradient text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary-gradient text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Portfolio Value</p>
                <p className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</p>
              </div>
              <Wallet className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
                <p className={`text-xl font-bold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${totalChange.toLocaleString()}
                </p>
              </div>
              {totalChange >= 0 ? 
                <TrendingUp className="w-6 h-6 text-green-600" /> : 
                <TrendingDown className="w-6 h-6 text-red-600" />
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Percentage Change</p>
                <p className={`text-xl font-bold ${totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalChangePercent.toFixed(2)}%
                </p>
              </div>
              <Activity className="w-6 h-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assets Count</p>
                <p className="text-xl font-bold">{assets.length}</p>
              </div>
              <PieChart className="w-6 h-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Allocation Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        dataKey="value"
                        data={assetAllocation}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      >
                        {assetAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(234, 89%, 74%)" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(234, 89%, 74%)' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          {/* Add New Asset Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Asset</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="asset-name">Asset Name</Label>
                  <Input
                    id="asset-name"
                    placeholder="e.g., Apple Inc."
                    value={newAsset.name}
                    onChange={(e) => setNewAsset(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="asset-type">Type</Label>
                  <Select value={newAsset.type} onValueChange={(value: Asset['type']) => setNewAsset(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="bonds">Bonds</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="commodities">Commodities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    placeholder="e.g., AAPL"
                    value={newAsset.symbol}
                    onChange={(e) => setNewAsset(prev => ({ ...prev, symbol: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={newAsset.quantity}
                    onChange={(e) => setNewAsset(prev => ({ ...prev, quantity: e.target.value }))}
                  />
                </div>
                <div className="flex items-end">
                  <div className="w-full">
                    <Label htmlFor="avg-cost">Avg Cost</Label>
                    <Input
                      id="avg-cost"
                      type="number"
                      placeholder="0.00"
                      value={newAsset.avgCost}
                      onChange={(e) => setNewAsset(prev => ({ ...prev, avgCost: e.target.value }))}
                    />
                  </div>
                  <Button onClick={addAsset} className="ml-2 bg-primary-gradient">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assets List */}
          <div className="space-y-4">
            {assets.map((asset) => {
              const AssetIcon = getAssetTypeIcon(asset.type);
              return (
                <Card key={asset.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted/20 flex items-center justify-center">
                          <AssetIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{asset.name}</h3>
                            <Badge variant="outline">{asset.symbol}</Badge>
                            <Badge variant="secondary">{asset.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {asset.quantity} @ ${asset.currentPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">${asset.value.toLocaleString()}</p>
                        <div className={`flex items-center gap-1 ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {asset.change >= 0 ? 
                            <TrendingUp className="w-4 h-4" /> : 
                            <TrendingDown className="w-4 h-4" />
                          }
                          <span className="text-sm font-medium">
                            ${Math.abs(asset.change).toLocaleString()} ({Math.abs(asset.changePercent).toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${transaction.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <p className="font-medium text-foreground">
                          {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.quantity} {transaction.asset}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} • ${transaction.price.toFixed(2)} per unit
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${transaction.total.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={assets}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="symbol" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(2)}%`, 'Return']} />
                      <Bar dataKey="changePercent" fill="hsl(234, 89%, 74%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Value Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">{asset.symbol}</span>
                        <span className="text-muted-foreground">
                          ${asset.value.toLocaleString()} ({((asset.value / totalPortfolioValue) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary-gradient h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(asset.value / totalPortfolioValue) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentTracker;