import React, { useState } from "react";
import { Bell, Search, User, FileText, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsSearchQuery, setToolsSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/templates", label: "Templates" },
    { to: "/pricing", label: "Pricing" },
    { to: "/api-docs", label: "API Docs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleToolsSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && toolsSearchQuery.trim()) {
      // Navigate to homepage with search parameter
      navigate(`/?search=${encodeURIComponent(toolsSearchQuery.trim())}`);
      setToolsSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div className="font-bold text-lg text-foreground">
              FinTools<span className="text-primary">.AI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.to) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search tools..." 
                className="pl-10 bg-muted/30 w-full"
                value={toolsSearchQuery}
                onChange={(e) => setToolsSearchQuery(e.target.value)}
                onKeyDown={handleToolsSearch}
              />
            </div>
            
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <User className="w-4 h-4" />
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.to) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search tools..." 
                    className="pl-10 bg-muted/30"
                    value={toolsSearchQuery}
                    onChange={(e) => setToolsSearchQuery(e.target.value)}
                    onKeyDown={handleToolsSearch}
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}