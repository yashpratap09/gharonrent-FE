"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Clock, CreditCard, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Return and Refund Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              We want you to be completely satisfied with our services. 
              Here's our comprehensive refund policy.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Overview */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <RefreshCw className="h-6 w-6 mr-2 text-primary" />
                Refund Policy Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                At RentHaven, we strive to provide exceptional service to all our users. 
                This Return and Refund Policy outlines the circumstances under which refunds 
                may be issued and the process for requesting them.
              </p>
              <p>
                We offer different refund terms for different types of services and charges. 
                Please read this policy carefully to understand your rights and our obligations.
              </p>
            </CardContent>
          </Card>

          {/* Subscription Refunds */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <CreditCard className="h-6 w-6 mr-2 text-primary" />
                Subscription Service Refunds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  30-Day Money-Back Guarantee
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Full refund available within 30 days of initial subscription</li>
                  <li>Applies to Professional and Enterprise plans</li>
                  <li>No questions asked for first-time subscribers</li>
                  <li>Refund processed within 5-7 business days</li>
                  <li>Original payment method will be credited</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Prorated Refunds</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Downgrading plans: Prorated credit applied to account</li>
                  <li>Mid-cycle cancellations: Refund for unused portion</li>
                  <li>Service interruptions: Credit for affected period</li>
                  <li>Calculated on a daily basis for accuracy</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Annual Subscriptions</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>30-day full refund period from purchase date</li>
                  <li>After 30 days: Prorated refund for remaining months</li>
                  <li>Minimum 3-month usage required for partial refunds</li>
                  <li>Annual discount benefits may be adjusted in refund calculation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Service Fee Refunds */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Additional Service Refunds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Photography Services</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Full refund if photos are not delivered within 48 hours</li>
                  <li>Reshoot at no cost if quality doesn't meet standards</li>
                  <li>50% refund if service is cancelled 24+ hours before appointment</li>
                  <li>No refund for cancellations within 24 hours</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Virtual Tour Services</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Full refund if virtual tour is not delivered within 72 hours</li>
                  <li>Revision included if tour doesn't meet specifications</li>
                  <li>Partial refund for technical issues affecting tour quality</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Verification Services</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Full refund if verification is not completed within 5 business days</li>
                  <li>No refund if verification fails due to incomplete documentation</li>
                  <li>Partial refund for delays caused by our verification team</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Background Check Services</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Full refund if report is not delivered within 3 business days</li>
                  <li>No refund if subject doesn't provide required consent</li>
                  <li>Rerun at no cost if initial report contains errors</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Non-Refundable Items */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <XCircle className="h-6 w-6 mr-2 text-red-500" />
                Non-Refundable Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>The following items and services are generally non-refundable:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Transaction processing fees charged by payment providers</li>
                <li>Services that have been fully delivered and utilized</li>
                <li>Promotional credits and discount vouchers</li>
                <li>Third-party service fees (government charges, legal fees)</li>
                <li>Customization work that has been completed</li>
                <li>Data export or migration services</li>
                <li>Training and consultation services after delivery</li>
              </ul>
              <p className="mt-4">
                <strong>Exception:</strong> Non-refundable items may be eligible for refund 
                in cases of service failure or technical issues on our part.
              </p>
            </CardContent>
          </Card>

          {/* Refund Process */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Clock className="h-6 w-6 mr-2 text-primary" />
                How to Request a Refund
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Step 1: Contact Support</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Email us at refunds@renthaven.com</li>
                  <li>Call our support line at +91 98765 43210</li>
                  <li>Use the "Request Refund" option in your account dashboard</li>
                  <li>Provide your account details and reason for refund</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Step 2: Provide Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Account email address and user ID</li>
                  <li>Transaction ID or invoice number</li>
                  <li>Date of purchase or service</li>
                  <li>Detailed reason for refund request</li>
                  <li>Supporting documentation if applicable</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Step 3: Review Process</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Initial response within 24 hours</li>
                  <li>Review completed within 3-5 business days</li>
                  <li>Additional information may be requested</li>
                  <li>Decision communicated via email</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Step 4: Refund Processing</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Approved refunds processed within 5-7 business days</li>
                  <li>Refund to original payment method</li>
                  <li>Bank processing may take additional 3-5 days</li>
                  <li>Confirmation email sent when refund is processed</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Special Circumstances */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <AlertCircle className="h-6 w-6 mr-2 text-primary" />
                Special Circumstances
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Service Outages</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Automatic credit for outages exceeding 4 hours</li>
                  <li>Prorated refund for extended service disruptions</li>
                  <li>No action required - credits applied automatically</li>
                  <li>Notification sent when credits are applied</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Data Loss or Security Breach</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Full refund for affected billing period</li>
                  <li>Additional compensation may be provided</li>
                  <li>Free data recovery services if possible</li>
                  <li>Enhanced security measures at no cost</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Billing Errors</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Immediate refund for incorrect charges</li>
                  <li>Account credit for processing delays</li>
                  <li>Review of billing processes to prevent recurrence</li>
                  <li>Expedited processing for error corrections</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Force Majeure Events</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Service credits for disruptions beyond our control</li>
                  <li>Extended service periods to compensate for downtime</li>
                  <li>Flexible refund terms during emergencies</li>
                  <li>Case-by-case evaluation of circumstances</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Internal Review</h3>
                <p>
                  If you disagree with a refund decision, you can request an internal review 
                  by our senior customer service team. Provide additional documentation or 
                  clarification to support your case.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Escalation Process</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Request escalation within 30 days of initial decision</li>
                  <li>Senior management review within 7 business days</li>
                  <li>Final decision communicated in writing</li>
                  <li>External mediation available for unresolved disputes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Chargeback Protection</h3>
                <p>
                  We work with payment providers to resolve disputes fairly. Initiating a 
                  chargeback without contacting us first may result in account suspension 
                  and additional fees.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Policy Changes */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We may update this Return and Refund Policy from time to time to reflect 
                changes in our services or legal requirements. We will notify users of 
                significant changes through:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email notifications to all active users</li>
                <li>Prominent notices on our website and platform</li>
                <li>In-app notifications for mobile users</li>
                <li>30-day advance notice for policy changes affecting existing subscriptions</li>
              </ul>
              <p>
                Continued use of our services after policy changes constitutes acceptance 
                of the updated terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                For refund requests or questions about this policy, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Refund Requests:</strong> refunds@renthaven.com</p>
                <p><strong>Customer Support:</strong> support@renthaven.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Business Hours:</strong> Monday-Friday, 9:00 AM - 7:00 PM IST</p>
                <p><strong>Address:</strong> 123 Business District, Tower A, 15th Floor, Mumbai, Maharashtra 400001, India</p>
              </div>
              <p>
                We are committed to resolving all refund requests fairly and promptly. 
                Our customer success team is here to help ensure your satisfaction with our services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}