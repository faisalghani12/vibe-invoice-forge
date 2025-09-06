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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-semibold text-primary">Business Letter Generator</span>
          </div>
          <h1 className="text-4xl font-bold">Create Professional Business Letters</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate professional business correspondence with our easy-to-use templates and customization tools.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Letter Details</CardTitle>
                <CardDescription>
                  Choose a template and fill in your information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="template">Letter Template</Label>
                  <Select value={letterData.template} onValueChange={handleTemplateChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a letter template" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(letterTemplates).map(([key, template]) => (
                        <SelectItem key={key} value={key}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sender Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="senderName">Your Name</Label>
                    <Input
                      id="senderName"
                      value={letterData.senderName}
                      onChange={(e) => handleInputChange('senderName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderTitle">Your Title</Label>
                    <Input
                      id="senderTitle"
                      value={letterData.senderTitle}
                      onChange={(e) => handleInputChange('senderTitle', e.target.value)}
                      placeholder="Marketing Manager"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="senderCompany">Your Company</Label>
                  <Input
                    id="senderCompany"
                    value={letterData.senderCompany}
                    onChange={(e) => handleInputChange('senderCompany', e.target.value)}
                    placeholder="ABC Corporation"
                  />
                </div>
                <div>
                  <Label htmlFor="senderAddress">Your Address</Label>
                  <Textarea
                    id="senderAddress"
                    value={letterData.senderAddress}
                    onChange={(e) => handleInputChange('senderAddress', e.target.value)}
                    placeholder="123 Business St., Suite 100&#10;City, State 12345"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="senderPhone">Phone Number</Label>
                    <Input
                      id="senderPhone"
                      value={letterData.senderPhone}
                      onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderEmail">Email Address</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={letterData.senderEmail}
                      onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                      placeholder="john.doe@company.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recipient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      value={letterData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientTitle">Recipient Title</Label>
                    <Input
                      id="recipientTitle"
                      value={letterData.recipientTitle}
                      onChange={(e) => handleInputChange('recipientTitle', e.target.value)}
                      placeholder="Director of Operations"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="recipientCompany">Recipient Company</Label>
                  <Input
                    id="recipientCompany"
                    value={letterData.recipientCompany}
                    onChange={(e) => handleInputChange('recipientCompany', e.target.value)}
                    placeholder="XYZ Industries"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientAddress">Recipient Address</Label>
                  <Textarea
                    id="recipientAddress"
                    value={letterData.recipientAddress}
                    onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
                    placeholder="456 Corporate Blvd.&#10;Business City, State 67890"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Letter Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={letterData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Enter the letter subject"
                  />
                </div>
                <div>
                  <Label htmlFor="body">Letter Body</Label>
                  <Textarea
                    id="body"
                    value={letterData.body}
                    onChange={(e) => handleInputChange('body', e.target.value)}
                    placeholder="Enter the main content of your letter..."
                    rows={12}
                  />
                </div>
                <div>
                  <Label htmlFor="closing">Closing</Label>
                  <Select value={letterData.closing} onValueChange={(value) => handleInputChange('closing', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sincerely">Sincerely</SelectItem>
                      <SelectItem value="Best regards">Best regards</SelectItem>
                      <SelectItem value="Respectfully">Respectfully</SelectItem>
                      <SelectItem value="Thank you">Thank you</SelectItem>
                      <SelectItem value="Yours truly">Yours truly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview and Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Letter Preview</CardTitle>
                <CardDescription>
                  Preview your letter before generating the final version
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-6 rounded-lg border">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                    {generateLetter()}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Choose how you want to save or share your letter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    onClick={copyToClipboard} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                  <Button 
                    onClick={printLetter} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Letter
                  </Button>
                  <Button 
                    onClick={downloadAsText} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download as Text File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}