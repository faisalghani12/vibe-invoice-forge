import { Card, CardContent } from "@/components/ui/card";
import { 
  Palette, 
  Download, 
  Users, 
  Zap, 
  Shield, 
  Clock,
  FileText,
  Globe,
  Code
} from "lucide-react";

/**
 * Features section highlighting key capabilities of the invoice generator
 * Uses a grid layout with icon-based feature cards
 */

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlight?: boolean;
}

const features: Feature[] = [
  {
    icon: Palette,
    title: "WYSIWYG Editor",
    description: "Design your invoices with our intuitive drag-and-drop editor. Real-time preview and instant customization.",
    highlight: true,
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    description: "Generate professional PDFs in seconds. High-quality output optimized for printing and digital sharing.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together with role-based access control. Share templates and maintain brand consistency across your team.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with modern architecture. Generate invoices in under 2 seconds with our optimized engine.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with encryption at rest and in transit. SOC 2 compliant with regular security audits.",
  },
  {
    icon: Clock,
    title: "Version Control",
    description: "Track changes and maintain template history. Rollback to previous versions and manage approval workflows.",
  },
  {
    icon: FileText,
    title: "500+ Templates",
    description: "Extensive library of professional templates for every industry. Regular updates with new designs.",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: "Support for 150+ currencies with automatic exchange rates. Localization for global businesses.",
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Seamlessly integrate with your existing tools. RESTful APIs for automation and custom workflows.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Create Perfect Invoices
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform combines powerful editing tools with enterprise-grade features 
            to streamline your billing process and enhance your professional image.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className={`group border-0 shadow-card hover:shadow-elegant transition-all duration-300 ${
                  feature.highlight ? 'bg-primary-gradient text-white' : 'bg-white'
                }`}
              >
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                    feature.highlight 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-primary-gradient'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      feature.highlight ? 'text-white' : 'text-white'
                    }`} />
                  </div>
                  
                  <h3 className={`font-semibold text-xl mb-3 ${
                    feature.highlight ? 'text-white' : 'text-foreground'
                  }`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`leading-relaxed ${
                    feature.highlight ? 'text-white/90' : 'text-muted-foreground'
                  }`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2 text-sm text-muted-foreground mb-4">
            <Zap className="w-4 h-4" />
            Ready to get started?
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Join thousands of businesses already using FinTools.AI
          </h3>
          <p className="text-muted-foreground">
            Start creating professional invoices today with our free tier.
          </p>
        </div>
      </div>
    </section>
  );
};