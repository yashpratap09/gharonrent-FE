"use client";

import {  useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
import { SlidersHorizontal,  } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { useSearchParams } from "next/navigation";
import GridCard from "@/components/properties/GridCard";




const SearchResults = () => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    propertyType: searchParams.get('type') || "",
    minRent: 0,
    maxRent: 100000,
    bedrooms: 1,
    furnishType: "",
    studentAllowed: false,
    coupleAllowed: false,
    locationName: searchParams.get('location') || "",
    page: 1,
    limit:10,
    sortBy:"createdAt",
    sortOrder:"asc"
  });
  const [sortBy, setSortBy] = useState("relevance");
const {
  usePropertiesQuery
} = useProperties();
const { data,isLoading: propertiesLoading  } = usePropertiesQuery(filters , true);
const propertiesTotal = data?.totalProperties || 0
const properties = data?.properties || []
const totalPages = data?.totalPages || 1





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
            <SelectItem value="flat">Flat/Apartment</SelectItem>
            <SelectItem value="room">Room</SelectItem>
            <SelectItem value="pg">PG/Hostels</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
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
            setFilters({ ...filters, bedrooms: Number(value) })
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
            <h1 className="lg:text-2xl font-bold mb-2 md:text-md  ">Search Results</h1>
            <p className="text-muted-foreground">
              {propertiesLoading ? "Searching..." : `Found ${propertiesTotal} properties`}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            {/* <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select> */}

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
                {properties.map((property) => 
                <GridCard key={property._id} property={property} />)}
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