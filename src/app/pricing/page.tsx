import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 users",
        "1GB storage",
        "6 core modules",
        "Email support",
        "Basic reporting",
        "Document templates"
      ],
      cta: "Get Started",
      popular: false,
      icon: Star,
      color: "bg-gray-100 text-gray-700"
    },
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Great for growing businesses",
      features: [
        "Up to 20 users",
        "10GB storage",
        "11 modules",
        "Priority support",
        "Advanced reporting",
        "API access",
        "Basic document management",
        "Inventory optimization"
      ],
      cta: "Start Free Trial",
      popular: true,
      icon: Zap,
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Pro",
      price: "$99",
      period: "/month",
      description: "For established businesses",
      features: [
        "Up to 100 users",
        "100GB storage",
        "25 modules",
        "24/7 phone support",
        "Custom integrations",
        "Advanced analytics",
        "White-label options",
        "Document management with workflows",
        "Business intelligence dashboards",
        "E-commerce integration",
        "Advanced HR & quality management",
        "Tax & regulatory compliance",
        "Audit trail & eSignature"
      ],
      cta: "Start Free Trial",
      popular: false,
      icon: Crown,
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "/month",
      description: "Custom solution for large organizations",
      features: [
        "Unlimited users",
        "Unlimited storage",
        "All modules",
        "Dedicated support",
        "Custom development",
        "SLA guarantee",
        "On-premise option",
        "Advanced AI-powered analytics",
        "Multi-channel e-commerce",
        "BizifyERP document workflows",
        "Custom reporting & BI",
        "Advanced tax compliance engine",
        "Enterprise audit trail & eSignature",
        "AI-powered automation & ML insights"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
    }
  ]

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers."
    },
    {
      question: "Is there a long-term contract?",
      answer: "No, we offer month-to-month billing. Annual plans are available with a 20% discount."
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer: "Yes, we offer special pricing for registered non-profit organizations and educational institutions."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
          <Badge variant="secondary" className="mb-8">
            No credit card required • Cancel anytime
          </Badge>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <div className={`w-12 h-12 rounded-lg ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                  {plan.icon && <plan.icon className="w-6 h-6" />}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our support team is here to help you find the perfect plan for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Contact Sales
            </Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}