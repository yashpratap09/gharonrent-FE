"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import Link from "next/link";
import { useProperties } from "@/hooks/useProperties";
import { useSearchParams } from "next/navigation";


const SearchResults = () => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    propertyType: searchParams.get('type') || "",
    minRent: 0,
    maxRent: 100000,
    bedrooms: "",
    furnishType: "",
    studentAllowed: false,
    coupleAllowed: false,
    location: searchParams.get('location') || "",
  });
  const [sortBy, setSortBy] = useState("relevance");
  
  const { 
    properties, 
    propertiesTotal, 
    propertiesLoading, 
    toggleFavorite, 
    isTogglingFavorite 
  } = useProperties(filters);


  const FilterContent = () => (
    <div className="space-y-6">
      {/* Property Type */}
      <div>
        <Label className="text-base font-medium">Property Type</Label>
        <Select
          onValueChange={(value) =>
            setFilters({ ...filters, propertyType: value })
          }
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rent Range */}
      <div>
        <Label className="text-base font-medium">Rent Range</Label>
        <div className="mt-4 space-y-4">
          <Slider
            defaultValue={[0, 100000]}
            max={100000}
            step={1000}
            className="w-full"
          />
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              className="flex-1"
              value={filters.minRent}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minRent: parseInt(e.target.value) || 0,
                })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              className="flex-1"
              value={filters.maxRent}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxRent: parseInt(e.target.value) || 100000,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <Label className="text-base font-medium">Bedrooms</Label>
        <Select
          onValueChange={(value) =>
            setFilters({ ...filters, bedrooms: value })
          }
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 BHK</SelectItem>
            <SelectItem value="2">2 BHK</SelectItem>
            <SelectItem value="3">3 BHK</SelectItem>
            <SelectItem value="4">4+ BHK</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Furnishing */}
      <div>
        <Label className="text-base font-medium">Furnishing</Label>
        <Select
          onValueChange={(value) =>
            setFilters({ ...filters, furnishType: value })
          }
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select furnishing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fully">Fully Furnished</SelectItem>
            <SelectItem value="semi">Semi Furnished</SelectItem>
            <SelectItem value="unfurnished">Unfurnished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
          <Label htmlFor="studentAllowed" className="font-medium">Students Allowed</Label>
          <Switch
            id="studentAllowed"
            checked={filters.studentAllowed}
            onCheckedChange={(checked) =>
              setFilters({ ...filters, studentAllowed: checked })
            }
          />
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
          <Label htmlFor="coupleAllowed" className="font-medium">Couples Allowed</Label>
          <Switch
            id="coupleAllowed"
            checked={filters.coupleAllowed}
            onCheckedChange={(checked) =>
              setFilters({ ...filters, coupleAllowed: checked })
            }
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-muted-foreground">
              {propertiesLoading ? "Searching..." : `Found ${propertiesTotal} properties`}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Properties</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Filter Properties</h3>
              <FilterContent />
            </Card>
          </div>

          {/* Property Results Grid */}
          <div className="flex-1">
            {propertiesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card">
                  <div className="relative overflow-hidden">
                    {property.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      disabled={isTogglingFavorite}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    >
                      <Heart 
                        className="h-4 w-4 text-muted-foreground hover:text-red-500" 
                      />
                    </button>
                    <img
                      src={property.images[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary" className="text-lg font-semibold">
                        ₹{property.rent.toLocaleString()}/mo
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex items-center mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
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
                        {property.furnishTypes === "fully" ? "Fully Furnished" : 
                         property.furnishTypes === "semi" ? "Semi Furnished" : "Unfurnished"}
                      </Badge>
                      {property.studentAllowed && (
                        <Badge variant="outline" className="text-xs">Students OK</Badge>
                      )}
                      {property.livingCoupleAllowed && (
                        <Badge variant="outline" className="text-xs">Couples OK</Badge>
                      )}
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/properties/${property.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {!propertiesLoading && properties.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Properties
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;