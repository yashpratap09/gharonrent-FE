"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Building,
  Phone,
  Mail,
  Calendar,
  Heart,
  Share2,
  MessageCircle,
  Users,
  Home,
  Utensils,
  Shield,
  CheckCircle,
  XCircle,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import { useProperties } from "@/hooks/useProperties";
import Image from "next/image";
import { wishlistApi } from '@/lib/api/wishlist';
import { recentlyViewedApi } from '@/lib/api/recentlyViewed';

interface PropertyDetailsProps {
  property: any;
  subscription?: SubscriptionInfo;
}

interface SubscriptionInfo {
  canViewFullDetails: boolean;
  canViewAddress: boolean;
  canViewOwnerContact: boolean;
  remainingViews: number;
  packageName: string;
}

const PropertyDetails = ({ property, subscription }: PropertyDetailsProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toggleFavorite, isTogglingFavorite } = useProperties();
  const recentlyViewedRef = useRef(false);

  const handleBackClick = () => {
    // Try to go back in browser history
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback to search page if no history
      router.push("/search");
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlist = await wishlistApi.getWishlist();
        setIsFavorite(wishlist.some((item) => item.propertyId._id === property._id));
      } catch {}
    };
    fetchWishlist();
  }, [property._id]);

  // Add to recently viewed when component mounts
  useEffect(() => {
    const addToRecentlyViewed = async () => {
      if (recentlyViewedRef.current) return; // Prevent duplicate calls
      recentlyViewedRef.current = true;
      
      try {
        await recentlyViewedApi.addToRecentlyViewed(property._id);
      } catch (error) {
        console.error('Failed to add to recently viewed:', error);
      }
    };

    if (property?._id) {
      addToRecentlyViewed();
    }
  }, [property._id]);

  if (!property) {
    return null;
  }

  // Handle subscription status
  const canViewContact = subscription?.canViewOwnerContact === true;
  
  // Debug: Log subscription data
  console.log('PropertyDetails - Subscription:', subscription);
  console.log('PropertyDetails - Can View Contact:', canViewContact);
  console.log('PropertyDetails - Property:', property);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleContact = () => {
    toast({
      title: "Contact Information",
      description: "Owner contact details are now visible. Please be respectful when contacting.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.propertyType} for rent`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Property link has been copied to clipboard.",
      });
    }
  };

  const handleToggleFavorite = async () => {
    setLoading(true);
    try {
      if (isFavorite) {
        await wishlistApi.removeFromWishlist(property._id);
        setIsFavorite(false);
      } else {
        await wishlistApi.addToWishlist(property._id);
        setIsFavorite(true);
      }
    } catch {}
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
            className="text-muted-foreground hover:text-primary transition-colors gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggleFavorite}
              disabled={loading}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Carousel */}
        <Card className="overflow-hidden shadow-2xl">
          <div className="relative aspect-video">
            <Carousel className="w-full">
              <CarouselContent>
                {property.propertyImages?.map((image: any, index: number) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative">
                      <Image
                        src={getImageUrl(image.imagePath)}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="object-cover w-full h-full"
                        fill
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                )) || (
                  <CarouselItem>
                    <div className="aspect-video relative bg-muted flex items-center justify-center">
                      <Home className="h-24 w-24 text-muted-foreground" />
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              {property.propertyImages?.length > 1 && (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              )}
            </Carousel>
          </div>
        </Card>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl md:text-xl lg:text-2xl mb-2 leading-tight break-words">{property.title}</CardTitle>
                      <CardDescription className="flex items-start text-xs sm:text-sm md:text-sm lg:text-base">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="break-words text-left">{property.fullAddress}</span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <Badge variant="secondary" className="text-base sm:text-lg md:text-lg lg:text-xl font-bold mb-2 px-2 py-1 sm:px-3 w-fit">
                        ₹{property.rent?.toLocaleString()}/month
                      </Badge>
                      {property.securityDeposit && (
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Security: ₹{property.securityDeposit.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Property Type and Category */}
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline">{property.propertyType}</Badge>
                  <Badge variant="outline">{property.category}</Badge>
                  {property.isFeatured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                      Featured
                    </Badge>
                  )}
                  {property.isVerified && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="flex items-center p-4 rounded-lg bg-muted/50">
                    <Bed className="h-6 w-6 mr-3 text-primary" />
                    <div>
                      <p className="font-semibold">{property.bedroom || 0}</p>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-muted/50">
                    <Bath className="h-6 w-6 mr-3 text-primary" />
                    <div>
                      <p className="font-semibold">{property.washroom || 0}</p>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                    </div>
                  </div>
                  {property.squareFeet && (
                    <div className="flex items-center p-4 rounded-lg bg-muted/50">
                      <Square className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="font-semibold">{property.squareFeet}</p>
                        <p className="text-sm text-muted-foreground">Sq. Ft.</p>
                      </div>
                    </div>
                  )}
                  {property.carParking && (
                    <div className="flex items-center p-4 rounded-lg bg-muted/50">
                      <Car className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="font-semibold">{property.carParking}</p>
                        <p className="text-sm text-muted-foreground">Parking</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  {/* Description */}
                  {property.description && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Description</h3>
                      <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                    </div>
                  )}

                  {/* Property Info */}
                  <div className="grid grid-cols-2 gap-6">
                    {property.floor && (
                      <div className="flex items-center p-3 rounded-lg border">
                        <Building className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{property.floor}</p>
                          <p className="text-sm text-muted-foreground">Floor</p>
                        </div>
                      </div>
                    )}
                    {/* {property.nextAvailability && (
                      <div className="flex items-center p-3 rounded-lg border">
                        <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {formatDate(property.nextAvailability)}
                          </p>
                          <p className="text-sm text-muted-foreground">Available From</p>
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Features & Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Fully Independent", value: property.fullyIndependent, icon: Home },
                    { label: "Couples Allowed", value: property.livinCoupleAllowed, icon: Users },
                    { label: "Students Allowed", value: property.studentAllowed, icon: Users },
                    { label: "Owner Free", value: property.ownerFree, icon: Shield },
                    { label: "Rent Negotiable", value: property.rentNegotiable, icon: MessageCircle },
                    { label: "Pet Friendly", value: property.petfriendly, icon: Heart },
                    { label: "Food Available", value: property.foodAvailability, icon: Utensils },
                    { label: "Gated Society", value: property.gatedSociety, icon: Shield },
                  ]
                  .filter(feature => feature.value) // Only show features that are true
                  .map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 rounded-lg border bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300"
                    >
                      <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                      <span className="font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity: string, index: number) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Furnishing */}
                {property.furnishTypes && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Furnishing</h4>
                    <Badge variant="secondary" className="px-4 py-2 text-base">
                      {property.furnishTypes}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle>Contact Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg">
                      {property.userName
                        ? property.userName.split(" ").map((n: string) => n[0]).join("")
                        : "O"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">
                      {property.userId?.name || "Property Owner"}
                    </p>
                    <p className="text-muted-foreground">{property.propertyType} Owner</p>
                    {subscription?.canViewOwnerContact && property.userId?.phoneNumber && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <Phone className="h-4 w-4 inline-block mr-1" />
                        {property.userId.phoneNumber}
                      </p>
                    )}
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Listed on {formatDate(property.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {subscription?.canViewOwnerContact ? (
                    // Show contact buttons if user has subscription
                    <div>
                      {property.userId?.phoneNumber && (
                        <Button 
                          className="w-full h-12 mb-3" 
                          onClick={() => window.location.href = `tel:${property.userId.phoneNumber}`}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call {property.userId.phoneNumber}
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="w-full h-12"
                        onClick={() => window.open(`https://wa.me/91${property.userId?.phoneNumber}`, '_blank')}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp Owner
                      </Button>
                    </div>
                  ) : (
                    // Show lock icon and subscribe button if no subscription
                    <Button 
                      variant="outline" 
                      className="w-full h-12 "
                      asChild
                    >
                      <Link href="/tenant-pricing">
                        <Lock className="h-4 w-4 mr-2 text-yellow-600 inline-block" />
                        Subscribe to View Contact
                      </Link>
                    </Button>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p>{property.propertyType}</p>
                    </div>
                   { property.category &&  <div>
                      <p className="font-medium text-muted-foreground">Category</p>
                      <p>{property.category}</p>
                    </div>}
                  {
                    property.furnishTypes &&   <div>
                    <p className="font-medium text-muted-foreground">Furnishing</p>
                    <p>{property.furnishTypes}</p>
                  </div>
                  }
                  {
                    property.fullAddress &&   <div>
                    <p className="font-medium text-muted-foreground">Full Address</p>
                    <p>{property.fullAddress}</p>
                  </div>
                  }
                    
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;