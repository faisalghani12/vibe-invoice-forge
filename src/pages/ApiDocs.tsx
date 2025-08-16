import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, BookOpen, Zap, Shield, Globe, Database } from "lucide-react";

/**
 * API Documentation page for developers
 * Provides comprehensive documentation for FinTools.AI Invoice API
 */
const ApiDocs = () => {
  const endpoints = [
    {
      method: "GET",
      path: "/api/templates",
      description: "Retrieve all available invoice templates",
      parameters: ["category", "limit", "offset"]
    },
    {
      method: "POST",
      path: "/api/invoices",
      description: "Create a new invoice from template",
      parameters: ["template_id", "data", "format"]
    },
    {
      method: "GET",
      path: "/api/invoices/{id}",
      description: "Get invoice details by ID",
      parameters: ["id"]
    },
    {
      method: "PUT",
      path: "/api/invoices/{id}",
      description: "Update existing invoice",
      parameters: ["id", "data"]
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Reliable",
      description: "99.9% uptime with global CDN for lightning-fast responses"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure",
      description: "Enterprise-grade security with OAuth 2.0 and API key authentication"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "RESTful API",
      description: "Clean, intuitive REST API following industry best practices"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Rich Data",
      description: "Comprehensive invoice data with custom fields and metadata"
    }
  ];

  return (
    <main>
        {/* Hero Section */}
        <section className="bg-hero-gradient py-24">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Developer API
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Integrate invoice generation directly into your applications with our 
                powerful, easy-to-use REST API. Create, customize, and manage invoices programmatically.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" variant="secondary">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <Code className="w-5 h-5 mr-2" />
                  View Examples
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* API Documentation */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">API Reference</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete documentation for all API endpoints with examples and response schemas.
              </p>
            </div>

            <Tabs defaultValue="endpoints" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="authentication">Auth</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="sdks">SDKs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="endpoints" className="space-y-6">
                <div className="grid gap-4">
                  {endpoints.map((endpoint, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Badge variant={
                            endpoint.method === "GET" ? "secondary" :
                            endpoint.method === "POST" ? "default" :
                            endpoint.method === "PUT" ? "destructive" : "outline"
                          }>
                            {endpoint.method}
                          </Badge>
                          <code className="font-mono text-sm">{endpoint.path}</code>
                        </div>
                        <p className="text-muted-foreground">{endpoint.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {endpoint.parameters.map((param) => (
                            <Badge key={param} variant="outline" className="font-mono">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="authentication">
                <Card>
                  <CardHeader>
                    <CardTitle>API Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      All API requests require authentication using an API key in the Authorization header:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <code className="font-mono text-sm">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                    <p className="text-muted-foreground">
                      You can generate API keys from your dashboard settings.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="examples">
                <Card>
                  <CardHeader>
                    <CardTitle>Code Examples</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Create Invoice (JavaScript)</h4>
                      <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <pre className="font-mono text-sm">
{`const response = await fetch('/api/invoices', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    template_id: 'template_123',
    data: {
      client_name: 'Acme Corp',
      amount: 1500.00,
      items: [...]
    }
  })
});

const invoice = await response.json();`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Fetch Templates (Python)</h4>
                      <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <pre className="font-mono text-sm">
{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.get(
    'https://api.fintools.ai/templates',
    headers=headers
)

templates = response.json()`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sdks">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Official SDKs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>JavaScript/Node.js</span>
                        <Button variant="outline" size="sm">Install</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Python</span>
                        <Button variant="outline" size="sm">Install</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>PHP</span>
                        <Button variant="outline" size="sm">Install</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Ruby</span>
                        <Button variant="outline" size="sm">Install</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Community SDKs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Go</span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>C#</span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Java</span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Rust</span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
  );
};

export default ApiDocs;