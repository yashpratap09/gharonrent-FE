"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const relatedProperties = [
  {
    id: "2",
    title: "Modern Studio Apartment",
    address: "456 Park Avenue",
    price: 25000,
    beds: 1,
    baths: 1,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Family House with Garden",
    address: "789 Garden Road",
    price: 45000,
    beds: 4,
    baths: 3,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Luxury Penthouse",
    address: "101 Sky View",
    price: 65000,
    beds: 3,
    baths: 2,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
  },
];

const PropertyDetails = () => {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  // Enhanced mock property data
  const property = {
    id: "1",
    title: "Luxury Apartment in City Center",
    description:
      "A beautiful and spacious apartment located in the heart of the city. This modern living space features premium amenities, stunning city views, and is perfect for families or professionals looking for comfort and convenience. The property includes high-end fixtures, modern appliances, and access to building amenities like gym, swimming pool, and 24/7 security.",
    bedroom: 3,
    washroom: 2,
    squareFeet: 1500,
    carParking: 2,
    floor: 5,
    rent: 35000,
    securityDeposit: 70000,
    address: "123 Main Street",
    fullAddress: "123 Main Street, Downtown Area, City Center, Mumbai 400001",
    propertyType: "Apartment",
    category: "Residential",
    furnishTypes: "Fully Furnished",
    livingCoupleAllowed: true,
    fullyIndependent: true,
    studentAllowed: true,
    ownerFree: true,
    rentNegotiable: true,
    brokerage: 50000,
    brokerageFeeType: "Fixed",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
    userName: "John Doe",
    userEmail: "john@example.com",
    userPhone: "+91 98765 43210",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2009&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=2053&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup", "Lift", "Parking"],
  };

  useEffect(() => {
    toast({
      title: "Property Details Loaded",
      description: "Welcome to the property details page",
    });
  }, [toast]);

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

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">
            ← Back to Search
          </Link>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Carousel */}
        <Card className="overflow-hidden shadow-2xl">
          <div className="relative aspect-video">
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative">
                      <img
                        src={image}
                        alt={`Property view ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </Card>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl mb-2">{property.title}</CardTitle>
                    <CardDescription className="flex items-center text-lg">
                      <MapPin className="h-5 w-5 mr-2" />
                      {property.address}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-2xl font-bold mb-2">
                      ₹{property.rent.toLocaleString()}/month
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Security: ₹{property.securityDeposit.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="flex items-center p-4 rounded-lg bg-muted/50">
                    <Bed className="h-6 w-6 mr-3 text-primary" />
                    <div>
                      <p className="font-semibold">{property.bedroom}</p>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-muted/50">
                    <Bath className="h-6 w-6 mr-3 text-primary" />
                    <div>
                      <p className="font-semibold">{property.washroom}</p>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-muted/50">
                    <Square className="h-6 w-6 mr-3 text-primary" />
                    <div>
                      <p className="font-semibold">{property.squareFeet}</p>
                      <p className="text-sm text-muted-foreground">Sq. Ft.</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-muted/50">
                    <Car className="h-6 w-6 mr-3 text-primary" />
                    <div>
                      <p className="font-semibold">{property.carParking}</p>
                      <p className="text-sm text-muted-foreground">Parking</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center p-3 rounded-lg border">
                      <Building className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Floor {property.floor}</p>
                        <p className="text-sm text-muted-foreground">Building Level</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 rounded-lg border">
                      <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Available Now</p>
                        <p className="text-sm text-muted-foreground">Move-in Ready</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Fully Independent", value: property.fullyIndependent },
                    { label: "Couples Allowed", value: property.livingCoupleAllowed },
                    { label: "Students Allowed", value: property.studentAllowed },
                    { label: "Owner Free", value: property.ownerFree },
                    { label: "Rent Negotiable", value: property.rentNegotiable },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-lg border ${
                        feature.value
                          ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300"
                          : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`h-3 w-3 rounded-full mr-3 ${
                          feature.value ? "bg-green-500" : "bg-muted-foreground"
                        }`}
                      />
                      <span className="font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Building Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
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
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{property.userName}</p>
                    <p className="text-muted-foreground">{property.propertyType} Owner</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Listed on {formatDate(property.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full h-12" onClick={handleContact}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call {property.userPhone}
                  </Button>
                  <Button variant="outline" className="w-full h-12">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full h-12">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Owner
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Category</p>
                      <p>{property.category}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Furnishing</p>
                      <p>{property.furnishTypes}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Full Address</p>
                      <p>{property.fullAddress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Properties */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Similar Properties</CardTitle>
            <CardDescription>You might also be interested in these properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((property) => (
                <Link key={property.id} href={`/properties/${property.id}`}>
                  <div className="group relative overflow-hidden rounded-lg border hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-muted-foreground text-sm flex items-center mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.address}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            {property.beds}
                          </span>
                          <span className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            {property.baths}
                          </span>
                        </div>
                        <Badge variant="secondary">
                          ₹{property.price.toLocaleString()}/mo
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDetails;