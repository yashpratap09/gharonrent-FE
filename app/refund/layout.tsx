import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return & Refund Policy - RentHaven | Money-Back Guarantee',
  description: 'RentHaven offers a 30-day money-back guarantee. Learn about our comprehensive refund policy for subscription services and additional features.',
  keywords: 'refund policy, money back guarantee, return policy, subscription refund, service refund',
  openGraph: {
    title: 'Return & Refund Policy - RentHaven',
    description: '30-day money-back guarantee. Learn about our comprehensive refund policy.',
    url: '/refund',
  },
  twitter: {
    title: 'Return & Refund Policy - RentHaven',
    description: '30-day money-back guarantee. Learn about our comprehensive refund policy.',
  },
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}