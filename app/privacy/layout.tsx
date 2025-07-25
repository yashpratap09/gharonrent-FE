import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - RentHaven | Data Protection & User Privacy',
  description: 'Read RentHaven\'s comprehensive privacy policy. Learn how we collect, use, and protect your personal information while providing rental property services.',
  keywords: 'privacy policy, data protection, user privacy, personal information, data security, gdpr compliance',
  openGraph: {
    title: 'Privacy Policy - RentHaven',
    description: 'Learn how we protect your personal information and respect your privacy.',
    url: '/privacy',
  },
  twitter: {
    title: 'Privacy Policy - RentHaven',
    description: 'Learn how we protect your personal information and respect your privacy.',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}