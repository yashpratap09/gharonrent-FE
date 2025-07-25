"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, FileText, AlertTriangle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Introduction */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Shield className="h-6 w-6 mr-2 text-primary" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                RentHaven ("we," "our," or "us") is committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our rental platform and services.
              </p>
              <p>
                By using RentHaven, you consent to the data practices described in this policy. 
                If you do not agree with this policy, please do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Eye className="h-6 w-6 mr-2 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Government-issued ID for verification purposes</li>
                  <li>Address and location information</li>
                  <li>Payment information and billing details</li>
                  <li>Profile photos and property images</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Usage Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage patterns and interaction with our platform</li>
                  <li>Search queries and property preferences</li>
                  <li>Location data when using mobile applications</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Property Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Property details, descriptions, and specifications</li>
                  <li>Property photos and virtual tour content</li>
                  <li>Rental history and pricing information</li>
                  <li>Property reviews and ratings</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Users className="h-6 w-6 mr-2 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide and maintain our rental platform services</li>
                <li>Process transactions and manage payments</li>
                <li>Verify user identity and prevent fraud</li>
                <li>Facilitate communication between property owners and tenants</li>
                <li>Send important notifications about your account and bookings</li>
                <li>Improve our services through analytics and user feedback</li>
                <li>Personalize your experience and show relevant properties</li>
                <li>Comply with legal obligations and resolve disputes</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Ensure platform security and prevent misuse</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="h-6 w-6 mr-2 text-primary" />
                Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <p>We may share your information in the following circumstances:</p>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">With Other Users</h3>
                <p>
                  Property owners and tenants can see relevant information to facilitate rentals, 
                  such as contact details, property preferences, and verification status.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Service Providers</h3>
                <p>
                  We work with trusted third-party service providers for payment processing, 
                  identity verification, customer support, and analytics.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Legal Requirements</h3>
                <p>
                  We may disclose information when required by law, court order, or to protect 
                  our rights, property, or safety of our users.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Business Transfers</h3>
                <p>
                  In case of merger, acquisition, or sale of assets, user information may be 
                  transferred as part of the business transaction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Lock className="h-6 w-6 mr-2 text-primary" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We implement appropriate technical and organizational security measures to protect 
                your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure data storage with encryption at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and employee training on data protection</li>
                <li>Incident response procedures for security breaches</li>
                <li>Compliance with industry security standards</li>
              </ul>
              <p>
                However, no method of transmission over the internet or electronic storage is 100% secure. 
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <AlertTriangle className="h-6 w-6 mr-2 text-primary" />
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Update or correct inaccurate personal information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Restriction:</strong> Limit how we process your personal information</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
              </ul>
              <p>
                To exercise these rights, please contact us at privacy@renthaven.com. 
                We will respond to your request within 30 days.
              </p>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Types of Cookies We Use:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Essential cookies for platform functionality</li>
                  <li>Analytics cookies to understand user behavior</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies for targeted advertising (with consent)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We retain your personal information for as long as necessary to provide our services 
                and comply with legal obligations. Specific retention periods include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Account information: Until account deletion plus 3 years for legal compliance</li>
                <li>Transaction records: 7 years for financial and tax purposes</li>
                <li>Communication logs: 2 years for customer service purposes</li>
                <li>Marketing data: Until consent is withdrawn</li>
                <li>Analytics data: Aggregated and anonymized after 2 years</li>
              </ul>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Your information may be transferred to and processed in countries other than your country 
                of residence. We ensure appropriate safeguards are in place for international transfers, 
                including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Adequacy decisions by relevant data protection authorities</li>
                <li>Standard contractual clauses approved by regulatory bodies</li>
                <li>Certification schemes and codes of conduct</li>
                <li>Binding corporate rules for intra-group transfers</li>
              </ul>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our services are not intended for children under 18 years of age. We do not knowingly 
                collect personal information from children under 18. If we become aware that we have 
                collected personal information from a child under 18, we will take steps to delete such information.
              </p>
              <p>
                If you are a parent or guardian and believe your child has provided us with personal 
                information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or legal requirements. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our platform</li>
                <li>Requiring acceptance for significant changes</li>
              </ul>
              <p>
                Your continued use of our services after the effective date of the updated policy 
                constitutes acceptance of the changes.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy 
                or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@renthaven.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> 123 Business District, Tower A, 15th Floor, Mumbai, Maharashtra 400001, India</p>
                <p><strong>Data Protection Officer:</strong> dpo@renthaven.com</p>
              </div>
              <p>
                We are committed to resolving any privacy concerns promptly and transparently.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}