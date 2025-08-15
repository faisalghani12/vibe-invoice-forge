import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InvoiceEditor } from "@/components/InvoiceEditor";
import { generateInvoicePDF, sampleInvoiceData } from "@/services/pdfGenerator";
import { Search, Download, Eye, Star, Filter, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Templates page showcasing all available invoice templates
 * Features search, filtering, and template preview capabilities
 */
const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { toast } = useToast();

  const handleQuickGenerate = async (templateName: string) => {
    try {
      const result = await generateInvoicePDF(sampleInvoiceData, `${templateName.toLowerCase().replace(/\s+/g, '-')}-invoice.pdf`);
      if (result.success) {
        toast({
          title: "Success!",
          description: `${templateName} invoice generated and downloaded successfully.`,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to generate PDF",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleCustomize = (templateName: string) => {
    setSelectedTemplate(templateName);
    setIsEditorOpen(true);
  };

  const templates = [
    {
      id: 1,
      name: "Professional Business",
      category: "Business",
      rating: 4.8,
      downloads: 15420,
      preview: "/placeholder.svg",
      tags: ["Clean", "Modern", "Corporate"],
      price: "Free"
    },
    {
      id: 2,
      name: "Creative Agency",
      category: "Creative",
      rating: 4.9,
      downloads: 12340,
      preview: "/placeholder.svg",
      tags: ["Colorful", "Bold", "Agency"],
      price: "Premium"
    },
    {
      id: 3,
      name: "Minimalist",
      category: "Simple",
      rating: 4.7,
      downloads: 18650,
      preview: "/placeholder.svg",
      tags: ["Clean", "Simple", "Elegant"],
      price: "Free"
    },
    {
      id: 4,
      name: "Tech Startup",
      category: "Technology",
      rating: 4.6,
      downloads: 9870,
      preview: "/placeholder.svg",
      tags: ["Modern", "Tech", "Startup"],
      price: "Premium"
    },
    {
      id: 5,
      name: "Consulting",
      category: "Professional",
      rating: 4.8,
      downloads: 11230,
      preview: "/placeholder.svg",
      tags: ["Professional", "Consulting", "Clean"],
      price: "Free"
    },
    {
      id: 6,
      name: "E-commerce",
      category: "Retail",
      rating: 4.5,
      downloads: 7890,
      preview: "/placeholder.svg",
      tags: ["Retail", "Product", "Sales"],
      price: "Premium"
    }
  ];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Invoice Templates
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose from our collection of professionally designed invoice templates. 
          Customize them to match your brand and start invoicing in minutes.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search templates..." 
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-elegant transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge variant={template.price === "Free" ? "secondary" : "default"}>
                      {template.price}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">{template.rating}</span>
                  </div>
                </div>
                
                <Badge variant="outline" className="mb-3">{template.category}</Badge>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {template.downloads.toLocaleString()} downloads
                </p>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleQuickGenerate(template.name)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Quick Generate
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleCustomize(template.name)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Templates
          </Button>
        </div>

      {/* Invoice Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedTemplate ? `Customize ${selectedTemplate}` : 'Create Invoice'}
            </DialogTitle>
          </DialogHeader>
          <InvoiceEditor 
            template={selectedTemplate || undefined}
            onClose={() => setIsEditorOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Templates;