import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Copy, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LetterData {
  template: string;
  senderName: string;
  senderTitle: string;
  senderCompany: string;
  senderAddress: string;
  senderPhone: string;
  senderEmail: string;
  recipientName: string;
  recipientTitle: string;
  recipientCompany: string;
  recipientAddress: string;
  subject: string;
  body: string;
  closing: string;
}

const letterTemplates = {
  business_inquiry: {
    name: "Business Inquiry",
    subject: "Inquiry About Your Services",
    body: `Dear [Recipient Name],

I hope this letter finds you well. I am writing to inquire about the services your company provides.

We are currently seeking a reliable partner for [specific service/product], and your company came highly recommended. We would appreciate the opportunity to discuss how we might work together.

Could you please provide information about:
• Your service offerings and capabilities
• Pricing structure and terms
• Timeline for project completion
• References from similar clients

We look forward to hearing from you and potentially establishing a mutually beneficial business relationship.

Thank you for your time and consideration.`,
    closing: "Sincerely"
  },
  complaint: {
    name: "Formal Complaint",
    subject: "Formal Complaint Regarding [Issue]",
    body: `Dear [Recipient Name],

I am writing to formally register a complaint regarding [specific issue/incident] that occurred on [date].

The details of the situation are as follows:
[Describe the issue in detail, including dates, times, and any relevant circumstances]

This situation has caused [describe impact/consequences], and I believe it requires immediate attention and resolution.

I would appreciate:
• A prompt acknowledgment of this complaint
• An investigation into the matter
• A clear timeline for resolution
• Steps to prevent similar issues in the future

I trust that this matter will be handled professionally and expeditiously. I look forward to your prompt response.`,
    closing: "Sincerely"
  },
  recommendation: {
    name: "Letter of Recommendation",
    subject: "Letter of Recommendation for [Name]",
    body: `Dear [Recipient Name],

I am pleased to write this letter of recommendation for [person's name], who [worked for/studied under] me as [position/role] from [start date] to [end date].

During this time, [name] demonstrated exceptional:
• [Key strength 1]
• [Key strength 2]
• [Key strength 3]

Specific examples of their outstanding performance include:
[Provide 1-2 specific examples of achievements or notable work]

[Name] possesses the skills, dedication, and character that would make them a valuable addition to any organization. I recommend [him/her/them] without reservation.

Please feel free to contact me if you need any additional information.`,
    closing: "Best regards"
  },
  partnership: {
    name: "Partnership Proposal",
    subject: "Partnership Opportunity Proposal",
    body: `Dear [Recipient Name],

I am writing to propose a strategic partnership between our organizations that could be mutually beneficial.

[Your company] specializes in [your expertise], while [their company] excels in [their expertise]. By combining our strengths, we could:
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

The proposed partnership would involve:
[Outline the basic structure of the partnership]

We believe this collaboration would allow both organizations to:
• Expand our market reach
• Share resources and expertise
• Create innovative solutions for our clients
• Achieve greater success together than apart

I would welcome the opportunity to discuss this proposal in detail. Would you be available for a meeting in the coming weeks?

Thank you for considering this opportunity.`,
    closing: "Best regards"
  },
  follow_up: {
    name: "Follow-up Letter",
    subject: "Follow-up on Our Recent Discussion",
    body: `Dear [Recipient Name],

Thank you for taking the time to meet with me on [date] to discuss [topic/project].

I wanted to follow up on our conversation and provide the additional information you requested:
• [Information point 1]
• [Information point 2]
• [Information point 3]

As we discussed, the next steps would be:
1. [Step 1]
2. [Step 2]
3. [Step 3]

I am excited about the possibility of moving forward with this opportunity and believe it would be beneficial for both our organizations.

Please let me know if you need any additional information or clarification. I look forward to hearing from you soon.`,
    closing: "Best regards"
  }
};

export default function BusinessLetterGenerator() {
  const { toast } = useToast();
  const [letterData, setLetterData] = useState<LetterData>({
    template: "",
    senderName: "",
    senderTitle: "",
    senderCompany: "",
    senderAddress: "",
    senderPhone: "",
    senderEmail: "",
    recipientName: "",
    recipientTitle: "",
    recipientCompany: "",
    recipientAddress: "",
    subject: "",
    body: "",
    closing: "Sincerely"
  });

  const handleTemplateChange = (template: string) => {
    if (template && letterTemplates[template as keyof typeof letterTemplates]) {
      const selectedTemplate = letterTemplates[template as keyof typeof letterTemplates];
      setLetterData(prev => ({
        ...prev,
        template,
        subject: selectedTemplate.subject,
        body: selectedTemplate.body,
        closing: selectedTemplate.closing
      }));
    } else {
      setLetterData(prev => ({ ...prev, template }));
    }
  };

  const handleInputChange = (field: keyof LetterData, value: string) => {
    setLetterData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateLetter = () => {
    const currentDate = getCurrentDate();
    
    return `${letterData.senderName}
${letterData.senderTitle}
${letterData.senderCompany}
${letterData.senderAddress}
${letterData.senderPhone}
${letterData.senderEmail}

${currentDate}

${letterData.recipientName}
${letterData.recipientTitle}
${letterData.recipientCompany}
${letterData.recipientAddress}

Subject: ${letterData.subject}

${letterData.body}

${letterData.closing},

${letterData.senderName}
${letterData.senderTitle}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateLetter());
      toast({
        title: "Copied to clipboard",
        description: "The letter has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy the letter to clipboard.",
        variant: "destructive",
      });
    }
  };

  const printLetter = () => {
    const letterContent = generateLetter();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Business Letter</title>
            <style>
              body { 
                font-family: 'Times New Roman', serif; 
                line-height: 1.6; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px;
                font-size: 12pt;
              }
              pre { 
                white-space: pre-wrap; 
                font-family: 'Times New Roman', serif;
                font-size: 12pt;
              }
            </style>
          </head>
          <body>
            <pre>${letterContent}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const downloadAsText = () => {
    const letterContent = generateLetter();
    const blob = new Blob([letterContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `business-letter-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your business letter is being downloaded.",
    });
  };

  return (
    <div className="min-h-screen bg-hero-gradient p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="mx-auto max-w-7xl space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-8 pt-8">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/20">
            <div className="p-3 bg-primary-gradient rounded-xl shadow-glow">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold bg-primary-gradient bg-clip-text text-transparent">
                Business Letter Generator
              </span>
              <p className="text-muted-foreground text-sm">AI-Powered Professional Letters</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl font-bold text-primary-foreground leading-tight">
              Create
              <span className="block bg-surface-gradient bg-clip-text text-transparent">
                Professional Letters
              </span>
              <span className="text-4xl text-primary-foreground/80">in Seconds</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Transform your business communication with our intelligent letter generator. 
              Choose from expertly crafted templates and customize every detail for perfect professional correspondence.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">5+ Professional Templates</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse [animation-delay:0.5s]"></div>
              <span className="text-sm font-medium">Instant PDF Export</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse [animation-delay:1s]"></div>
              <span className="text-sm font-medium">No Backend Required</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/95 backdrop-blur-sm shadow-card border-border/20 hover:shadow-elegant transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Letter Template</CardTitle>
                    <CardDescription className="text-muted-foreground/80">
                      Choose from our collection of professional templates
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="template" className="text-sm font-medium text-foreground/90">
                    Template Type
                  </Label>
                  <Select value={letterData.template} onValueChange={handleTemplateChange}>
                    <SelectTrigger className="mt-2 h-12 border-border/40 bg-background/50 hover:border-primary/20 transition-colors">
                      <SelectValue placeholder="Select a letter template" />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-sm border-border/20">
                      {Object.entries(letterTemplates).map(([key, template]) => (
                        <SelectItem 
                          key={key} 
                          value={key}
                          className="hover:bg-primary/5 focus:bg-primary/10 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            {template.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/95 backdrop-blur-sm shadow-card border-border/20 hover:shadow-elegant transition-all duration-300 group">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-xl">Sender Information</CardTitle>
                    <CardDescription className="text-muted-foreground/80">
                      Your contact details and professional information
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderName" className="text-sm font-medium text-foreground/90">Your Name</Label>
                    <Input
                      id="senderName"
                      value={letterData.senderName}
                      onChange={(e) => handleInputChange('senderName', e.target.value)}
                      placeholder="John Doe"
                      className="h-11 border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderTitle" className="text-sm font-medium text-foreground/90">Your Title</Label>
                    <Input
                      id="senderTitle"
                      value={letterData.senderTitle}
                      onChange={(e) => handleInputChange('senderTitle', e.target.value)}
                      placeholder="Marketing Manager"
                      className="h-11 border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderCompany" className="text-sm font-medium text-foreground/90">Your Company</Label>
                  <Input
                    id="senderCompany"
                    value={letterData.senderCompany}
                    onChange={(e) => handleInputChange('senderCompany', e.target.value)}
                    placeholder="ABC Corporation"
                    className="h-11 border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderAddress" className="text-sm font-medium text-foreground/90">Your Address</Label>
                  <Textarea
                    id="senderAddress"
                    value={letterData.senderAddress}
                    onChange={(e) => handleInputChange('senderAddress', e.target.value)}
                    placeholder="123 Business St., Suite 100&#10;City, State 12345"
                    rows={3}
                    className="border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderPhone" className="text-sm font-medium text-foreground/90">Phone Number</Label>
                    <Input
                      id="senderPhone"
                      value={letterData.senderPhone}
                      onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                      placeholder="(555) 123-4567"
                      className="h-11 border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail" className="text-sm font-medium text-foreground/90">Email Address</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={letterData.senderEmail}
                      onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                      placeholder="john.doe@company.com"
                      className="h-11 border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/95 backdrop-blur-sm shadow-card border-border/20 hover:shadow-elegant transition-all duration-300 group">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-xl">Recipient Information</CardTitle>
                    <CardDescription className="text-muted-foreground/80">
                      Details of the person or organization receiving the letter
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName" className="text-sm font-medium text-foreground/90">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      value={letterData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      placeholder="Jane Smith"
                      className="h-11 border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientTitle" className="text-sm font-medium text-foreground/90">Recipient Title</Label>
                    <Input
                      id="recipientTitle"
                      value={letterData.recipientTitle}
                      onChange={(e) => handleInputChange('recipientTitle', e.target.value)}
                      placeholder="Director of Operations"
                      className="h-11 border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientCompany" className="text-sm font-medium text-foreground/90">Recipient Company</Label>
                  <Input
                    id="recipientCompany"
                    value={letterData.recipientCompany}
                    onChange={(e) => handleInputChange('recipientCompany', e.target.value)}
                    placeholder="XYZ Industries"
                    className="h-11 border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientAddress" className="text-sm font-medium text-foreground/90">Recipient Address</Label>
                  <Textarea
                    id="recipientAddress"
                    value={letterData.recipientAddress}
                    onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
                    placeholder="456 Corporate Blvd.&#10;Business City, State 67890"
                    rows={3}
                    className="border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/95 backdrop-blur-sm shadow-card border-border/20 hover:shadow-elegant transition-all duration-300 group">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-xl">Letter Content</CardTitle>
                    <CardDescription className="text-muted-foreground/80">
                      Customize the subject, body, and closing of your letter
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-foreground/90">Subject</Label>
                  <Input
                    id="subject"
                    value={letterData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Enter the letter subject"
                    className="h-11 border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body" className="text-sm font-medium text-foreground/90">Letter Body</Label>
                  <Textarea
                    id="body"
                    value={letterData.body}
                    onChange={(e) => handleInputChange('body', e.target.value)}
                    placeholder="Enter the main content of your letter..."
                    rows={12}
                    className="border-border/40 bg-background/50 hover:border-primary/20 focus:border-primary/40 transition-all resize-none min-h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closing" className="text-sm font-medium text-foreground/90">Closing</Label>
                  <Select value={letterData.closing} onValueChange={(value) => handleInputChange('closing', value)}>
                    <SelectTrigger className="h-11 border-border/40 bg-background/50 hover:border-primary/20 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-sm border-border/20">
                      <SelectItem value="Sincerely" className="hover:bg-primary/5 focus:bg-primary/10 cursor-pointer">Sincerely</SelectItem>
                      <SelectItem value="Best regards" className="hover:bg-primary/5 focus:bg-primary/10 cursor-pointer">Best regards</SelectItem>
                      <SelectItem value="Respectfully" className="hover:bg-primary/5 focus:bg-primary/10 cursor-pointer">Respectfully</SelectItem>
                      <SelectItem value="Thank you" className="hover:bg-primary/5 focus:bg-primary/10 cursor-pointer">Thank you</SelectItem>
                      <SelectItem value="Yours truly" className="hover:bg-primary/5 focus:bg-primary/10 cursor-pointer">Yours truly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview and Actions */}
          <div className="space-y-6">
            <Card className="bg-card/95 backdrop-blur-sm shadow-elegant border-border/20 sticky top-6">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-xl">Live Preview</CardTitle>
                    <CardDescription className="text-muted-foreground/80">
                      Real-time preview of your professional letter
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-surface-gradient p-8 rounded-xl border border-border/20 shadow-inner">
                  <div className="bg-card max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent p-6 rounded-lg shadow-sm border border-border/10">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-serif text-foreground/90">
                      {generateLetter()}
                    </pre>
                  </div>
                </div>

                {/* Export Actions */}
                <div className="space-y-4">
                  <div className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Export Options
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      onClick={copyToClipboard} 
                      variant="outline" 
                      className="w-full justify-start h-12 border-border/40 bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all group"
                    >
                      <Copy className="mr-3 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Copy to Clipboard</span>
                    </Button>
                    
                    <Button 
                      onClick={printLetter} 
                      variant="outline" 
                      className="w-full justify-start h-12 border-border/40 bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all group"
                    >
                      <Printer className="mr-3 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Print Letter</span>
                    </Button>
                    
                    <Button 
                      onClick={downloadAsText} 
                      className="w-full justify-start h-12 bg-primary-gradient hover:shadow-glow transition-all group text-primary-foreground font-medium"
                    >
                      <Download className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>Download as Text File</span>
                    </Button>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/20">
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold text-primary">
                        {generateLetter().split('\n').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Lines</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold text-primary">
                        {generateLetter().split(' ').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Words</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold text-primary">
                        {generateLetter().length}
                      </div>
                      <div className="text-xs text-muted-foreground">Characters</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}