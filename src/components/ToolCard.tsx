import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: "available" | "coming-soon" | "beta";
  features: string[];
  onAction: () => void;
  actionLabel: string;
  gradient?: string;
}

export function ToolCard({
  title,
  description,
  icon: Icon,
  status,
  features,
  onAction,
  actionLabel,
  gradient = "bg-primary-gradient"
}: ToolCardProps) {
  const isDisabled = status === "coming-soon";

  const statusConfig = {
    available: { variant: "default" as const, label: "Available" },
    "coming-soon": { variant: "secondary" as const, label: "Coming Soon" },
    beta: { variant: "outline" as const, label: "Beta" }
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover-scale">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center text-white mb-4`}>
            <Icon className="w-6 h-6" />
          </div>
          <Badge variant={statusConfig[status].variant}>
            {statusConfig[status].label}
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full" 
          onClick={onAction}
          disabled={isDisabled}
          variant={isDisabled ? "secondary" : "default"}
        >
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
}