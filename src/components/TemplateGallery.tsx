import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Star } from "lucide-react";

/**
 * Template gallery component showcasing available invoice templates
 * Features categorized templates with preview and action buttons
 */

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  downloads: string;
  preview: string;
  isPremium?: boolean;
}

const templates: Template[] = [
  {
    id: "1",
    name: "Modern Professional",
    category: "Business",
    description: "Clean, minimal design perfect for professional services",
    rating: 4.9,
    downloads: "12.5K",
    preview: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Creative Agency",
    category: "Creative",
    description: "Bold design with accent colors for creative businesses",
    rating: 4.8,
    downloads: "8.2K",
    preview: "/placeholder.svg",
    isPremium: true,
  },
  {
    id: "3",
    name: "Corporate Elite",
    category: "Corporate",
    description: "Sophisticated layout for enterprise clients",
    rating: 4.9,
    downloads: "15.1K",
    preview: "/placeholder.svg",
    isPremium: true,
  },
  {
    id: "4",
    name: "Startup Simple",
    category: "Startup",
    description: "Streamlined design for growing businesses",
    rating: 4.7,
    downloads: "6.8K",
    preview: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Freelancer Pro",
    category: "Freelance",
    description: "Personal branding focused template",
    rating: 4.8,
    downloads: "9.3K",
    preview: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Medical Practice",
    category: "Healthcare",
    description: "Professional template for medical services",
    rating: 4.9,
    downloads: "4.2K",
    preview: "/placeholder.svg",
    isPremium: true,
  },
];

const categories = ["All", "Business", "Creative", "Corporate", "Startup", "Freelance", "Healthcare"];

export const TemplateGallery = () => {
  return (
    <section className="py-24 bg-surface-gradient">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of professional invoice templates. 
            Each template is carefully designed and optimized for different industries.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-0 shadow-card"
            >
              <CardContent className="p-0">
                {/* Template Preview */}
                <div className="relative aspect-[4/5] bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={`${template.name} template preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="default">
                      <Download className="w-4 h-4 mr-1" />
                      Use Template
                    </Button>
                  </div>
                  
                  {/* Premium Badge */}
                  {template.isPremium && (
                    <Badge className="absolute top-3 right-3 bg-primary-gradient text-white border-0">
                      Premium
                    </Badge>
                  )}
                </div>
                
                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      {template.rating}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template.downloads} downloads</span>
                    <span>Updated recently</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Templates
          </Button>
        </div>
      </div>
    </section>
  );
};