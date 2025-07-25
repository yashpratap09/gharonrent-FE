"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Eye,
  MessageSquare,
  MoreVertical,
  Edit,
  Trash2,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface PropertyCardProps {
  property: any;
  isHost?: boolean;
  showManageActions?: boolean;
  showRemoveFromWishlist?: boolean;
}

export const PropertyCard = ({ 
  property, 
  isHost = false, 
  showManageActions = false,
  showRemoveFromWishlist = false 
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const handleRemoveFromWishlist = () => {
    toast({
      title: "Removed from Wishlist",
      description: "Property has been removed from your wishlist.",
    });
  };

  const handleEdit = () => {
    toast({
      title: "Edit Property",
      description: "Redirecting to edit property page...",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Delete Property",
      description: "Property deletion functionality will be available soon.",
      variant: "destructive"
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Status Badge for Host */}
        {isHost && property.status && (
          <div className="absolute top-4 left-4">
            <Badge variant={property.status === "active" ? "default" : "secondary"}>
              {property.status}
            </Badge>
          </div>
        )}

        {/* Property Type Badge */}
        {!isHost && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 text-primary-foreground">
              {property.type}
            </Badge>
          </div>
        )}

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          {!isHost && (
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            >
              <Heart 
                className={`h-4 w-4 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                }`} 
              />
            </button>
          )}
          
          {showManageActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Property
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Property
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <Badge variant="secondary" className="text-lg font-semibold">
            ₹{property.price.toLocaleString()}/mo
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        <p className="text-muted-foreground text-sm flex items-center mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {property.address}
        </p>

        {/* Property Details */}
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <span className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {property.beds} beds
          </span>
          <span className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {property.baths} baths
          </span>
          <span className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            {property.area} sq.ft
          </span>
        </div>

        {/* Host Stats */}
        {isHost && (property.views || property.inquiries) && (
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {property.views} views
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {property.inquiries} inquiries
            </span>
            <span className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Active
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {showRemoveFromWishlist ? (
            <>
              <Button asChild className="flex-1">
                <Link href={`/properties/${property.id}`}>
                  View Details
                </Link>
              </Button>
              <Button variant="outline" onClick={handleRemoveFromWishlist}>
                Remove
              </Button>
            </>
          ) : (
            <Button asChild className="w-full">
              <Link href={`/properties/${property.id}`}>
                {isHost ? "Manage Property" : "View Details"}
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};