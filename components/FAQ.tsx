"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I list my property on RentHaven?",
    answer: "Listing your property is simple! Click on 'List Property' in the header, fill out the property details form with accurate information, upload high-quality photos, and submit for verification. Our team will review and approve your listing within 24-48 hours."
  },
  {
    question: "Is RentHaven free to use?",
    answer: "RentHaven offers a free Basic plan that allows you to list up to 2 properties. For more features like unlimited listings, featured placements, and advanced analytics, we offer Professional (₹999/month) and Enterprise (₹2,999/month) plans."
  },
  {
    question: "How does property verification work?",
    answer: "Our 3-step verification process includes: 1) Document verification of ownership/authorization, 2) Physical inspection by certified agents, and 3) Legal compliance checks. This ensures all properties are genuine and meet our quality standards."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI, net banking, and popular digital wallets. All payments are processed securely through encrypted channels with our trusted payment partners."
  },
  {
    question: "How quickly can I find tenants for my property?",
    answer: "Most verified properties receive inquiries within 24-48 hours of listing. The time to find suitable tenants depends on factors like location, pricing, property condition, and market demand. Our average time to successful rental is 7-14 days."
  },
  {
    question: "Do you provide legal assistance for rental agreements?",
    answer: "Yes! We provide legal document templates, rental agreement preparation, and guidance on local rental laws. Our Enterprise plan includes comprehensive legal compliance assistance and dedicated support for complex transactions."
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not completely satisfied, contact our support team within 30 days for a full refund. We're committed to ensuring your success on our platform."
  },
  {
    question: "How do you ensure tenant quality?",
    answer: "We offer comprehensive tenant screening services including background checks, employment verification, credit history review, and reference checks. Property owners can access detailed tenant profiles to make informed decisions."
  }
];

export const FAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Get answers to the most common questions about RentHaven
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-lg border-0 bg-background/80 backdrop-blur-xl">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full p-6 text-left justify-between h-auto hover:bg-muted/50"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-base pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0" />
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

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <Button variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};