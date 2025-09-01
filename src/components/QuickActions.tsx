import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Zap, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuickCalculator } from "./QuickCalculator";

export function QuickActions() {
  const navigate = useNavigate();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const quickActions = [
    {
      title: "Create Invoice",
      description: "Generate a new invoice quickly",
      icon: FileText,
      action: () => navigate("/templates"),
      variant: "primary"
    },
    {
      title: "Upload Receipt",  
      description: "Scan and digitize receipts",
      icon: Upload,
      action: () => {}, // Coming soon
      variant: "secondary",
      disabled: true
    },
    {
      title: "Quick Calculate",
      description: "Fast pricing calculations", 
      icon: Zap,
      action: () => setIsCalculatorOpen(true),
      variant: "accent"
    },
    {
      title: "View Analytics",
      description: "Check your financial reports",
      icon: BarChart3,
      action: () => {}, // Coming soon
      variant: "muted",
      disabled: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 lg:p-6 flex flex-col items-center gap-2 lg:gap-3 hover:bg-muted/50 hover:border-primary/30 transition-all duration-200"
              onClick={action.action}
              disabled={action.disabled}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-white transition-all duration-200 ${
                action.variant === 'primary' ? 'bg-primary-gradient' :
                action.variant === 'secondary' ? 'bg-secondary' :
                action.variant === 'accent' ? 'bg-accent' :
                'bg-muted'
              } ${action.disabled ? 'opacity-50' : 'hover:scale-110'}`}>
                <action.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="text-center space-y-1">
                <div className="font-semibold text-xs lg:text-sm leading-tight">{action.title}</div>
                <div className="text-xs text-muted-foreground leading-tight hidden lg:block">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>

      <QuickCalculator 
        open={isCalculatorOpen} 
        onOpenChange={setIsCalculatorOpen} 
      />
    </Card>
  );
}