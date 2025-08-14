import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-invoice.jpg";

/**
 * Hero section component for the invoice generator landing page
 * Features gradient background, compelling copy, and action buttons
 */
export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              FinTools.AI Invoice Generator
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Create Professional
              <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Invoices in Minutes
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Design beautiful, branded invoices with our template-based editor. 
              Generate PDFs instantly, manage versions, and streamline your billing workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-elegant group"
              >
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <FileText className="mr-2 w-5 h-5" />
                View Templates
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-8 mt-12 text-white/70">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm">Invoices Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroImage} 
                alt="Professional invoice template preview" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-lg p-4 shadow-card">
              <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-card">
              <div className="text-sm font-medium text-foreground">PDF Ready</div>
              <div className="text-xs text-muted-foreground">Export instantly</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};