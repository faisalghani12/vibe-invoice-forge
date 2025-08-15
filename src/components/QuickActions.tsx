import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Zap, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Create Invoice",
      description: "Generate a new invoice quickly",
      icon: FileText,
      action: () => navigate("/templates"),
      color: "bg-blue-500"
    },
    {
      title: "Upload Receipt",
      description: "Scan and digitize receipts",
      icon: Upload,
      action: () => {}, // Coming soon
      color: "bg-green-500",
      disabled: true
    },
    {
      title: "Quick Calculate",
      description: "Fast pricing calculations",
      icon: Zap,
      action: () => navigate("/pricing"),
      color: "bg-yellow-500"
    },
    {
      title: "View Analytics",
      description: "Check your financial reports",
      icon: BarChart3,
      action: () => {}, // Coming soon
      color: "bg-purple-500",
      disabled: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-muted/50"
              onClick={action.action}
              disabled={action.disabled}
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white ${action.disabled ? 'opacity-50' : ''}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}