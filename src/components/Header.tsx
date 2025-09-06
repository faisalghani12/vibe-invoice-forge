import { Button } from "@/components/ui/button";
import { FileText, Menu } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Header component with navigation and branding
 * Features responsive design with mobile menu toggle
 */
export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="font-bold text-xl text-foreground">
              Tools<span className="text-primary">.AI</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/templates"
              className="text-foreground hover:text-primary transition-colors"
            >
              Templates
            </Link>
            <a
              href="/#features"
              className="text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <Link
              to="/pricing"
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/api-docs"
              className="text-foreground hover:text-primary transition-colors"
            >
              API Docs
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/get-started">Get Started</Link>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
