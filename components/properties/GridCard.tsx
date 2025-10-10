import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {  MapPin, Bed, Bath, Square, Heart, Loader2 } from "lucide-react";
import Image from 'next/image';
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { Property } from '@/lib/api/properties';
import { Button } from '../ui/button';
import { useWishlistContext } from '@/providers/WishlistProvider';

interface Props {
   property: Property
}

const GridCard = ({property}:Props) => {
  const [loading, setLoading] = useState(false);
  const { isPropertyWishlisted, toggleWishlist } = useWishlistContext();

  const isWishlisted = isPropertyWishlisted(property._id);

  const handleWishlist = async () => {
    setLoading(true);
    try {
      await toggleWishlist(property._id);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
    setLoading(false);
  };

  return (
    <Card key={property._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card">
      <div className="relative overflow-hidden">
        {property.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              Featured
            </Badge>
          </div>
        )}
        <button
          onClick={handleWishlist}
          disabled={loading}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
            />
          )}
        </button>
        <Image
          src={ getImageUrl(property?.propertyImages?.[0]?.imagePath)  }
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          width={100}
          height={100}
        />
        <div className="absolute bottom-4 right-4">
          <Badge variant="secondary" className="text-lg font-semibold">
            ₹{property?.rent?.toLocaleString()}/mo
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {property.title}
        </h3>
        <p className="text-muted-foreground text-sm  items-center mb-4 line-clamp-1">
          {property.fullAddress}
        </p>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <span className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {property.bedroom} beds
          </span>
          <span className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {property.washroom} baths
          </span>
          <span className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            {property.squareFeet} sq.ft
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            {property.furnishTypes}
          </Badge>
          {property.livingCoupleAllowed && (
            <Badge variant="outline" className="text-xs">Couples Allow</Badge>
          )}
          {property.fullyIndependent && (
            <Badge variant="outline" className="text-xs">Fully Independent</Badge>
          )}
        </div>
        <Button asChild className="w-full">
          <Link href={`/${property.slug || property._id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default GridCard;
