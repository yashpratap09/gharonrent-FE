"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Heart, Shield, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    bio: "15+ years in real estate technology. Former VP at leading property platforms."
  },
  {
    name: "Priya Sharma",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&h=150&auto=format&fit=crop",
    bio: "Tech visionary with expertise in scalable platforms and user experience design."
  },
  {
    name: "Amit Patel",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
    bio: "Operations expert ensuring smooth property transactions and customer satisfaction."
  },
  {
    name: "Sunita Mehta",
    role: "Head of Customer Success",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    bio: "Dedicated to creating exceptional experiences for property owners and tenants."
  }
];

const faqs = [
  {
    question: "How does RentHaven ensure property verification?",
    answer: "We have a comprehensive 3-step verification process: document verification, physical inspection by our certified agents, and legal compliance checks. Every property listed on our platform goes through this rigorous process to ensure authenticity and quality."
  },
  {
    question: "What makes RentHaven different from other rental platforms?",
    answer: "RentHaven combines cutting-edge technology with personalized service. We offer AI-powered property matching, 24/7 customer support, verified listings, transparent pricing, and end-to-end assistance from search to move-in."
  },
  {
    question: "Is there any hidden cost or commission?",
    answer: "Absolutely not. We believe in complete transparency. All costs, including our service fees, are clearly mentioned upfront. There are no hidden charges, and our pricing structure is designed to be fair for both property owners and tenants."
  },
  {
    question: "How quickly can I list my property?",
    answer: "You can list your property in under 10 minutes using our streamlined process. Once submitted, our verification team reviews it within 24-48 hours. Verified properties go live immediately and start receiving inquiries."
  },
  {
    question: "What support do you provide during the rental process?",
    answer: "We provide end-to-end support including property visits coordination, documentation assistance, legal guidance, rent agreement preparation, and post-move-in support. Our dedicated relationship managers ensure a smooth experience."
  }
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              About RentHaven
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We&apos;re revolutionizing the rental experience by connecting property owners with 
              quality tenants through technology, transparency, and trust.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-lg">Founded in 2020</Badge>
              <Badge variant="secondary" className="px-4 py-2 text-lg">10,000+ Properties</Badge>
              <Badge variant="secondary" className="px-4 py-2 text-lg">50+ Cities</Badge>
              <Badge variant="secondary" className="px-4 py-2 text-lg">99% Satisfaction</Badge>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold flex items-center">
                    <Target className="h-6 w-6 mr-2 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To simplify and transform the rental experience by providing a transparent, 
                    secure, and efficient platform that connects property owners with quality 
                    tenants. We believe everyone deserves a hassle-free way to find their perfect 
                    home or reliable tenants.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold flex items-center">
                    <Award className="h-6 w-6 mr-2 text-primary" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To become India&apos;s most trusted rental platform, where every property 
                    transaction is seamless, secure, and satisfying. We envision a future 
                    where finding the right rental property is as easy as a few clicks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Born from personal frustration with the rental process
              </p>
            </div>
            
            <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    RentHaven was founded in 2020 when our founders experienced firsthand the 
                    challenges of finding quality rental properties in India&apos;s major cities. 
                    The process was fragmented, time-consuming, and often unreliable.
                  </p>
                  <p>
                    Determined to solve this problem, we assembled a team of real estate experts, 
                    technology professionals, and customer service specialists. Our goal was simple: 
                    create a platform that makes renting properties as easy as booking a hotel room.
                  </p>
                  <p>
                    Today, RentHaven serves thousands of property owners and tenants across 50+ cities 
                    in India. We&apos;ve facilitated over 25,000 successful rental agreements and continue 
                    to grow our community of satisfied users.
                  </p>
                  <p>
                    Our success is built on three pillars: cutting-edge technology, rigorous property 
                    verification, and exceptional customer service. We&apos;re not just a platform; 
                    we&apos;re your trusted partner in the rental journey.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl text-center">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Trust & Transparency</h3>
                  <p className="text-muted-foreground">
                    We believe in complete transparency in all our dealings. Every property 
                    is verified, every fee is disclosed, and every process is clear.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl text-center">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Customer First</h3>
                  <p className="text-muted-foreground">
                    Our customers are at the heart of everything we do. Their satisfaction 
                    and success drive our innovation and service excellence.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl text-center">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously innovate to make the rental process faster, easier, 
                    and more efficient through technology and process improvements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground">
                The passionate people behind RentHaven
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="shadow-xl border-0 bg-background/80 backdrop-blur-xl text-center">
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Get answers to common questions about RentHaven
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
                  <CardContent className="p-0">
                    <Button
                      variant="ghost"
                      className="w-full p-6 text-left justify-between h-auto"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="font-semibold text-base">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl text-muted-foreground">
                Numbers that showcase our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">10,000+</h3>
                <p className="text-muted-foreground font-medium">Verified Properties</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">25,000+</h3>
                <p className="text-muted-foreground font-medium">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</h3>
                <p className="text-muted-foreground font-medium">Cities Covered</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">99%</h3>
                <p className="text-muted-foreground font-medium">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}