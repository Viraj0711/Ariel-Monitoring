import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Building2,
  Users,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    projectSize: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Our team will get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        projectSize: "",
        message: ""
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "sales@skyviewbuildtrack.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "123 Construction Ave, Suite 100",
      description: "San Francisco, CA 94102"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "< 24 hours",
      description: "Average response time"
    }
  ];

  const features = [
    {
      icon: Building2,
      title: "Enterprise Solutions",
      description: "Custom solutions for large construction firms and enterprise clients"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Priority support with dedicated account management"
    },
    {
      icon: Zap,
      title: "Quick Implementation",
      description: "Get up and running in less than 48 hours with our expert team"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-xl font-semibold">Contact Sales</h1>
            </div>
            <Button onClick={() => navigate('/auth')}>
              Start Free Trial
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Construction Projects?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Speak with our construction technology experts to learn how ConstructEye 
            can streamline your project monitoring and boost collaboration.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Get a Personalized Demo</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      placeholder="Construction Co."
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select onValueChange={(value) => handleInputChange("projectType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="mixed">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectSize">Project Size</Label>
                    <Select onValueChange={(value) => handleInputChange("projectSize", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (&lt; $1M)</SelectItem>
                        <SelectItem value="medium">Medium ($1M - $10M)</SelectItem>
                        <SelectItem value="large">Large ($10M - $50M)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (&gt; $50M)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your project</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your construction monitoring needs, current challenges, or specific requirements..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Features */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Multiple ways to reach our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{info.title}</h4>
                      <p className="text-sm text-foreground font-medium">{info.value}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card>
              <CardHeader>
                <CardTitle>Why Choose ConstructEye?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="gradient-feature text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Prefer to start immediately?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign up for a free trial and explore all features
                </p>
                <Button 
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  size="sm"
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;