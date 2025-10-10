"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Search, Home, Users, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your perfect rental with our advanced search filters and AI-powered recommendations."
  },
  {
    icon: Shield,
    title: "Verified Properties",
    description: "All properties are verified and inspected to ensure quality and authenticity."
  },
  {
    icon: Home,
    title: "Virtual Tours",
    description: "Take virtual tours of properties from the comfort of your home before visiting."
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "Connect with verified landlords and tenants in our trusted community."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Get help whenever you need it with our round-the-clock customer support."
  },
  {
    icon: Award,
    title: "Best Deals",
    description: "Access exclusive deals and negotiate the best rental prices directly."
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose RentHaven?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We make finding and renting properties simple, secure, and stress-free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-background">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};