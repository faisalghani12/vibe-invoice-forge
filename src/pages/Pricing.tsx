import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, X, Zap, Crown, Users } from "lucide-react";

/**
 * Pricing page displaying subscription plans and features
 * Showcases Free, Pro, and Enterprise tiers with detailed comparisons
 */
const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals and small businesses getting started",
      icon: <Zap className="w-6 h-6" />,
      features: [
        { name: "5 invoices per month", included: true },
        { name: "3 template designs", included: true },
        { name: "Basic customization", included: true },
        { name: "PDF export", included: true },
        { name: "Email support", included: true },
        { name: "Custom branding", included: false },
        { name: "Advanced templates", included: false },
        { name: "API access", included: false },
        { name: "Priority support", included: false },
        { name: "Team collaboration", included: false }
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Everything you need to scale your invoicing operations",
      icon: <Crown className="w-6 h-6" />,
      features: [
        { name: "Unlimited invoices", included: true },
        { name: "50+ premium templates", included: true },
        { name: "Full customization", included: true },
        { name: "PDF export", included: true },
        { name: "Email support", included: true },
        { name: "Custom branding", included: true },
        { name: "Advanced templates", included: true },
        { name: "API access", included: true },
        { name: "Priority support", included: true },
        { name: "Team collaboration", included: false }
      ],
      buttonText: "Start Pro Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "Advanced features for large teams and organizations",
      icon: <Users className="w-6 h-6" />,
      features: [
        { name: "Unlimited invoices", included: true },
        { name: "All premium templates", included: true },
        { name: "Full customization", included: true },
        { name: "PDF export", included: true },
        { name: "Email support", included: true },
        { name: "Custom branding", included: true },
        { name: "Advanced templates", included: true },
        { name: "API access", included: true },
        { name: "Priority support", included: true },
        { name: "Team collaboration", included: true }
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient py-24">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Choose the perfect plan for your business. Start with our free tier 
                and upgrade as you grow. No hidden fees, no surprises.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  30-day free trial
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Cancel anytime
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  No setup fees
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`relative overflow-hidden transition-all hover:shadow-elegant ${
                    plan.popular ? 'border-primary shadow-glow scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary-gradient text-white text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center text-white">
                        {plan.icon}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1 mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="px-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'text-muted-foreground'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="p-6">
                    <Button 
                      variant={plan.buttonVariant} 
                      className="w-full"
                      size="lg"
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have questions about our pricing? We've got answers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground">
                  Yes, all paid plans come with a 30-day free trial. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee on all paid plans, no questions asked.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;