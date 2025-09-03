import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/ToolCard";
import { QuickActions } from "@/components/QuickActions";
import { 
  FileText, 
  CreditCard, 
  Code, 
  TrendingUp, 
  Users, 
  Clock,
  Zap,
  Camera,
  BarChart3
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const tools = [
    {
      title: "Invoice Generator",
      description: "Create professional invoices with customizable templates",
      icon: FileText,
      status: "available" as const,
      features: [
        "Professional templates",
        "PDF generation",
        "Custom branding",
        "Multi-currency support"
      ],
      onAction: () => navigate("/templates"),
      actionLabel: "Create Invoice",
      gradient: "bg-primary-gradient"
    },
    {
      title: "Pricing Calculator",
      description: "Calculate project costs and pricing strategies",
      icon: CreditCard,
      status: "available" as const,
      features: [
        "Cost calculation",
        "Profit margins",
        "Tax calculations",
        "Multiple pricing models"
      ],
      onAction: () => navigate("/pricing"),
      actionLabel: "Calculate Pricing",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      title: "Receipt Scanner",
      description: "Scan and digitize receipts with AI-powered extraction",
      icon: Camera,
      status: "available" as const,
      features: [
        "AI text extraction",
        "Auto categorization",
        "Data parsing",
        "Export to CSV"
      ],
      onAction: () => navigate("/receipt-scanner"),
      actionLabel: "Scan Receipt",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      title: "Financial Report Generator",
      description: "Create comprehensive financial reports and analytics",
      icon: BarChart3,
      status: "available" as const,
      features: [
        "Income statements",
        "Profit & loss reports",
        "Expense tracking",
        "Professional formatting"
      ],
      onAction: () => navigate("/financial-reports"),
      actionLabel: "Generate Report",
      gradient: "bg-gradient-to-br from-purple-500 to-blue-600"
    },
    {
      title: "Financial Analytics",
      description: "Track and analyze your financial performance",
      icon: BarChart3,
      status: "coming-soon" as const,
      features: [
        "Revenue tracking",
        "Expense analysis",
        "Profit reports",
        "Custom dashboards"
      ],
      onAction: () => {},
      actionLabel: "Coming Soon",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      title: "API Integration",
      description: "Integrate our tools into your applications",
      icon: Code,
      status: "available" as const,
      features: [
        "RESTful API",
        "SDKs available",
        "Webhook support",
        "Rate limiting"
      ],
      onAction: () => navigate("/api-docs"),
      actionLabel: "View Documentation",
      gradient: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      title: "Team Management",
      description: "Manage team access and collaboration features",
      icon: Users,
      status: "beta" as const,
      features: [
        "User roles",
        "Team workspaces",
        "Shared templates",
        "Activity tracking"
      ],
      onAction: () => {},
      actionLabel: "Join Beta",
      gradient: "bg-gradient-to-br from-indigo-500 to-purple-600"
    }
  ];

  // Filter tools based on search query with case insensitive partial matching
  const filteredTools = tools.filter(tool => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase().trim();
    return tool.title.toLowerCase().includes(query) ||
           tool.description.toLowerCase().includes(query) ||
           tool.features.some(feature => feature.toLowerCase().includes(query));
  });

  const stats = [
    { label: "Invoices Generated", value: "12,450+", icon: FileText },
    { label: "Active Users", value: "3,200+", icon: Users },
    { label: "API Calls", value: "156K+", icon: Code },
    { label: "Uptime", value: "99.9%", icon: TrendingUp }
  ];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to FinTools.AI
        </h1>
        <p className="text-muted-foreground text-lg">
          Your comprehensive suite of financial tools and automation
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Separator */}
      <div className="border-t border-border"></div>

      {/* Performance Overview */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Performance Overview</h2>
          <p className="text-sm text-muted-foreground">Key metrics and platform statistics</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-muted/20">
              <CardContent className="p-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-primary-gradient rounded-lg flex items-center justify-center text-white">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Available Tools"}
          </h2>
          <div className="flex gap-2">
            {searchQuery && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  navigate("/");
                }}
              >
                Clear Search
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate("/get-started")}>
              <Clock className="w-4 h-4 mr-2" />
              Get Started Guide
            </Button>
          </div>
        </div>
        
        {searchQuery && (
          <div className="text-sm text-muted-foreground">
            Showing {filteredTools.length} of {tools.length} tools
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))
          ) : searchQuery ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No tools found matching "{searchQuery}"</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try searching with different keywords or check your spelling
              </p>
            </div>
          ) : (
            tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Invoice #INV-2024-001 generated 2 hours ago",
              "Pricing calculation completed for Project Alpha",
              "API key regenerated for development environment",
              "3 new team members added to workspace"
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-muted-foreground">{activity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
