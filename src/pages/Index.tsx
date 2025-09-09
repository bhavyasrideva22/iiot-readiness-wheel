import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, CheckCircle, TrendingUp, Users, Clock, Award } from 'lucide-react';
import heroImage from '@/assets/iiot-hero.jpg';

const Index = () => {
  const navigate = useNavigate();

  const startAssessment = () => {
    navigate('/assessment');
  };

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-success" />,
      title: "Psychometric Analysis",
      description: "Evaluate your personality fit and intrinsic motivation for industrial automation"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "Technical Assessment", 
      description: "Test your knowledge of PLCs, SCADA, industrial protocols, and IoT systems"
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "WISCAR Framework",
      description: "Comprehensive evaluation across Will, Interest, Skill, Cognitive ability, and more"
    },
    {
      icon: <Award className="w-6 h-6 text-warning" />,
      title: "Career Matching",
      description: "Get personalized career recommendations with salary ranges and skill requirements"
    }
  ];

  const stats = [
    { number: "15-20", label: "Minutes", description: "Assessment Duration" },
    { number: "6", label: "Dimensions", description: "WISCAR Analysis" },
    { number: "4+", label: "Career Paths", description: "Potential Matches" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Professional Career Assessment
                </Badge>
                <h1 className="text-5xl font-bold leading-tight">
                  Should I Learn
                  <span className="bg-gradient-hero bg-clip-text text-transparent block">
                    IIoT Integration?
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Discover if Industrial IoT Integration aligns with your personality, technical aptitude, 
                  and career goals through our comprehensive assessment framework.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={startAssessment}
                  className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 h-auto flex items-center gap-3"
                >
                  <Play className="w-5 h-5" />
                  Start Assessment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 h-auto"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm font-medium text-foreground">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl transform rotate-3" />
              <img
                src={heroImage}
                alt="Industrial IoT Integration"
                className="relative rounded-2xl shadow-elevated w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">What You'll Discover</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our assessment evaluates multiple dimensions to give you a complete picture of your fit for IIoT Integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-industrial hover:shadow-elevated transition-shadow border-0">
                <CardHeader className="text-center">
                  <CardTitle className="flex flex-col items-center gap-3">
                    {feature.icon}
                    <span className="text-lg">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What is IIoT Integration */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elevated border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">What is IIoT Integration?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                IIoT Integrators bridge Operational Technology (OT) and Information Technology (IT) systems 
                in industrial environments. They work with IoT-enabled devices, communication protocols, 
                automation systems, and data analytics platforms to create connected, intelligent manufacturing systems.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Typical Responsibilities:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Configure and program PLCs and SCADA systems</li>
                    <li>• Implement industrial communication protocols</li>
                    <li>• Design IoT sensor networks and edge computing</li>
                    <li>• Integrate OT systems with cloud platforms</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-accent">Career Paths:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• IIoT Integration Specialist</li>
                    <li>• Industrial Automation Engineer</li>
                    <li>• Controls Systems Engineer</li>
                    <li>• Edge Computing Engineer</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ready to Discover Your Fit?</h2>  
            <p className="text-muted-foreground">
              Take our comprehensive assessment to get personalized insights and career guidance
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <Clock className="w-4 h-4" />
            <span>15-20 minutes • No registration required • Instant results</span>
          </div>

          <Button
            size="lg"
            onClick={startAssessment}
            className="bg-gradient-primary hover:shadow-glow text-lg px-12 py-6 h-auto"
          >
            Begin Your Assessment Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
