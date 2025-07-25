import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - RentHaven | Service Agreement',
  description: 'Read RentHaven\'s terms and conditions. Understand your rights and responsibilities when using our rental property platform and services.',
  keywords: 'terms and conditions, service agreement, user agreement, legal terms, rental platform rules',
  openGraph: {
    title: 'Terms and Conditions - RentHaven',
    description: 'Understand your rights and responsibilities when using our rental platform.',
    url: '/terms',
  },
  twitter: {
    title: 'Terms and Conditions - RentHaven',
    description: 'Understand your rights and responsibilities when using our rental platform.',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}