"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, Users, Shield, Gavel } from "lucide-react";

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms carefully before using RentHaven's services.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Introduction */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="h-6 w-6 mr-2 text-primary" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                These Terms and Conditions ("Terms") govern your use of RentHaven's website, 
                mobile application, and related services (collectively, the "Service") operated 
                by RentHaven Private Limited ("we," "us," or "our").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. 
                If you disagree with any part of these terms, you may not access the Service.
              </p>
              <p>
                These Terms apply to all visitors, users, property owners, tenants, and others 
                who access or use the Service.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Users className="h-6 w-6 mr-2 text-primary" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                RentHaven is an online platform that connects property owners with potential tenants. 
                Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Property listing and search functionality</li>
                <li>User verification and background checks</li>
                <li>Communication tools between users</li>
                <li>Payment processing and rent collection</li>
                <li>Property management tools</li>
                <li>Customer support services</li>
                <li>Legal document templates and assistance</li>
              </ul>
              <p>
                We act as an intermediary platform and do not own, manage, or control any properties 
                listed on our platform. We are not a party to rental agreements between users.
              </p>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Shield className="h-6 w-6 mr-2 text-primary" />
                User Accounts and Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Account Creation</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">User Conduct</h3>
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide false or misleading information</li>
                  <li>Impersonate another person or entity</li>
                  <li>Use the Service for illegal or unauthorized purposes</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Spam or send unsolicited communications</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the Service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Verification</h3>
                <p>
                  We may require identity verification for certain features. You agree to provide 
                  requested documentation and understand that verification does not guarantee 
                  the accuracy of user information or property details.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Property Listings */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Property Listings and Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Listing Requirements</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Property owners must have legal right to rent the property</li>
                  <li>All listing information must be accurate and up-to-date</li>
                  <li>Photos must accurately represent the property</li>
                  <li>Pricing must be clearly stated with no hidden fees</li>
                  <li>Comply with local laws and regulations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Content Standards</h3>
                <p>All content posted on our platform must:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Be truthful and not misleading</li>
                  <li>Not violate any laws or regulations</li>
                  <li>Not infringe on intellectual property rights</li>
                  <li>Not contain offensive or inappropriate material</li>
                  <li>Not include discriminatory language or practices</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Content Removal</h3>
                <p>
                  We reserve the right to remove any content that violates these Terms or our 
                  community guidelines. We may also suspend or terminate accounts for violations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payments and Fees */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Payments and Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Service Fees</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Subscription fees for premium features are charged monthly or annually</li>
                  <li>Transaction fees may apply to payment processing</li>
                  <li>Additional service fees for optional services</li>
                  <li>All fees are clearly disclosed before charging</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Payment Terms</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Payments are processed through secure third-party providers</li>
                  <li>Subscription fees are charged in advance</li>
                  <li>Failed payments may result in service suspension</li>
                  <li>Refunds are subject to our refund policy</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Rent Collection</h3>
                <p>
                  When using our rent collection service, we act as a payment processor. 
                  We are not responsible for disputes between landlords and tenants regarding rent payments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Our Rights</h3>
                <p>
                  The Service and its original content, features, and functionality are owned by 
                  RentHaven and are protected by international copyright, trademark, patent, 
                  trade secret, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">User Content</h3>
                <p>
                  You retain ownership of content you post but grant us a worldwide, non-exclusive, 
                  royalty-free license to use, display, and distribute your content in connection 
                  with the Service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Trademark Policy</h3>
                <p>
                  RentHaven and related logos are trademarks of RentHaven Private Limited. 
                  You may not use our trademarks without prior written permission.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <AlertTriangle className="h-6 w-6 mr-2 text-primary" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Service Availability</h3>
                <p>
                  We strive to maintain service availability but do not guarantee uninterrupted access. 
                  The Service may be temporarily unavailable due to maintenance, updates, or technical issues.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Third-Party Content</h3>
                <p>
                  We are not responsible for the accuracy, completeness, or reliability of user-generated 
                  content or third-party information. Users should verify all information independently.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by law, RentHaven shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages arising from 
                  your use of the Service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">By You</h3>
                <p>
                  You may terminate your account at any time by contacting customer support or 
                  using the account deletion feature in your profile settings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">By Us</h3>
                <p>
                  We may terminate or suspend your account immediately, without prior notice, 
                  for violations of these Terms or for any other reason at our sole discretion.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Effect of Termination</h3>
                <p>
                  Upon termination, your right to use the Service will cease immediately. 
                  We may retain certain information as required by law or for legitimate business purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Gavel className="h-6 w-6 mr-2 text-primary" />
                Governing Law and Dispute Resolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Governing Law</h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India, 
                  without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Jurisdiction</h3>
                <p>
                  Any disputes arising from these Terms or your use of the Service shall be subject 
                  to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Dispute Resolution</h3>
                <p>
                  We encourage users to contact us first to resolve any disputes. If informal 
                  resolution is not possible, disputes may be resolved through binding arbitration 
                  in accordance with Indian arbitration laws.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision 
                is material, we will provide at least 30 days notice before any new terms take effect.
              </p>
              <p>
                What constitutes a material change will be determined at our sole discretion. 
                By continuing to access or use our Service after revisions become effective, 
                you agree to be bound by the revised terms.
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
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> legal@renthaven.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> 123 Business District, Tower A, 15th Floor, Mumbai, Maharashtra 400001, India</p>
              </div>
              <p>
                For general inquiries, you can also reach us at info@renthaven.com or through 
                our customer support portal.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}