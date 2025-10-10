import type { Metadata } from 'next';
import { generateSearchTitle, generateSearchDescription, parseSearchUrl } from '@/lib/searchUtils';

interface Props {
  params: { params: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const searchParams = parseSearchUrl(params.params || []);
  const title = generateSearchTitle(searchParams);
  const description = generateSearchDescription(searchParams, 0);

  return {
    title,
    description,
    keywords: `${searchParams.propertyType || 'properties'} for rent, ${searchParams.location || 'rental properties'}, property search, rental listings`,
    openGraph: {
      title,
      description,
      url: `/search/${params.params?.join('/') || ''}`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

