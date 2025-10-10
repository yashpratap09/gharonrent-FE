"use client";

import { useState, useEffect, useCallback, memo, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { LocationSearchOptimized } from "@/components/LocationSearchOptimized";
import { PlaceDetails } from "@/lib/api/places";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";

export type SearchFilters = {
  propertyType: string | null;
  location: string | null;
  minRent: number | null;
  maxRent: number | null;
  bedrooms: number | null;
  furnishType: string | null;
  tenantType: string | null;
  studentAllowed: boolean | null;
  coupleAllowed: boolean | null;
  fullyIndependent: boolean | null;
  ownerFree: boolean | null;
  rentNegotiable: boolean | null;
  photoOnly: boolean | null;
  primeOnly: boolean | null;
  page: number;
  limit: number;
};

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
  className?: string;
}

const FilterPanel = memo(({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  activeFiltersCount,
  className = ""
}: FilterPanelProps) => {
  // Local state for UI only - separate from main filters
  const [localLocation, setLocalLocation] = useState(filters.location || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minRent || 0, 
    filters.maxRent || 100000
  ]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs to prevent unnecessary updates
  const locationRef = useRef<string>(filters.location || "");
  const priceRef = useRef<[number, number]>([filters.minRent || 0, filters.maxRent || 100000]);

  // Update local state when filters change externally (but not during user interaction)
  useEffect(() => {
    if (!isDragging && (filters.location !== locationRef.current)) {
      setLocalLocation(filters.location || "");
      locationRef.current = filters.location || "";
    }
  }, [filters.location, isDragging]);

  useEffect(() => {
    if (!isDragging) {
      const newRange: [number, number] = [filters.minRent || 0, filters.maxRent || 100000];
      if (newRange[0] !== priceRef.current[0] || newRange[1] !== priceRef.current[1]) {
        setPriceRange(newRange);
        priceRef.current = newRange;
      }
    }
  }, [filters.minRent, filters.maxRent, isDragging]);

  // Handle filter updates
  const updateFilter = useCallback((key: keyof SearchFilters, value: any) => {
    const newFilters = {
      ...filters,
      [key]: (value === "" || value === false || value === 0) ? null : value,
      page: 1 // Reset page when filters change
    };
    onFiltersChange(newFilters);
  }, [filters, onFiltersChange]);

  // Location handlers
  const handleLocationSelect = useCallback((place: PlaceDetails) => {
    const locationName = place.name || place.formatted_address;
    setLocalLocation(locationName);
    locationRef.current = locationName;
    
    const newFilters = {
      ...filters,
      location: locationName,
      latitude: place.geometry?.lat,
      longitude: place.geometry?.lng,
      page: 1
    };
    onFiltersChange(newFilters);
  }, [filters, onFiltersChange]);

  const handleLocationInputChange = useCallback((value: string) => {
    setLocalLocation(value);
    if (!value.trim()) {
      locationRef.current = "";
      const newFilters = {
        ...filters,
        location: null,
        latitude: null,
        longitude: null,
        page: 1
      };
      onFiltersChange(newFilters);
    }
  }, [filters, onFiltersChange]);

  // Price range handlers
  const handlePriceChange = useCallback((values: number[]) => {
    setPriceRange([values[0], values[1]]);
  }, []);

  const handlePriceDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handlePriceDragEnd = useCallback(() => {
    setIsDragging(false);
    priceRef.current = priceRange;
    
    const newFilters = {
      ...filters,
      minRent: priceRange[0] || null,
      maxRent: priceRange[1] || null,
      page: 1
    };
    onFiltersChange(newFilters);
  }, [priceRange, filters, onFiltersChange]);

  // Input handlers for price
  const handleMinRentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const newRange: [number, number] = [value, priceRange[1]];
    setPriceRange(newRange);
    updateFilter('minRent', value);
  }, [priceRange, updateFilter]);

  const handleMaxRentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 100000;
    const newRange: [number, number] = [priceRange[0], value];
    setPriceRange(newRange);
    updateFilter('maxRent', value);
  }, [priceRange, updateFilter]);

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Filter className="h-5 w-5 mr-2" />
        Filter Properties
      </h3>
      
      <div className="space-y-6">
        {/* Location Search */}
        <div>
          <Label className="text-base font-medium">Search Location</Label>
          <div className="mt-2">
            <LocationSearchOptimized
              key="stable-location-search" // Stable key to prevent remounting
              placeholder="Enter city, area, sector, or address"
              initialValue={localLocation}
              onLocationSelect={handleLocationSelect}
              onInputChange={handleLocationInputChange}
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <Label className="text-base font-medium">Property Type</Label>
          <Select
            value={filters.propertyType || ""}
            onValueChange={(value) => updateFilter('propertyType', value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Room">Room</SelectItem>
              <SelectItem value="Flat">Flat/Apartment</SelectItem>
              <SelectItem value="PG">PG/Hostels</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rent Range */}
        <div>
          <Label className="text-base font-medium">Rent Range</Label>
          <div className="mt-4 space-y-4">
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                onValueCommit={handlePriceDragEnd}
                onPointerDown={handlePriceDragStart}
                max={100000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                className="flex-1"
                value={priceRange[0] || ""}
                onChange={handleMinRentChange}
              />
              <Input
                type="number"
                placeholder="Max"
                className="flex-1"
                value={priceRange[1] || ""}
                onChange={handleMaxRentChange}
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <Label className="text-base font-medium">Bedrooms</Label>
          <Select
            value={filters.bedrooms ? filters.bedrooms.toString() : ""}
            onValueChange={(value) => updateFilter('bedrooms', parseInt(value) || 0)}
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
            value={filters.furnishType || ""}
            onValueChange={(value) => updateFilter('furnishType', value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select furnishing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
              <SelectItem value="Semi Furnished">Semi Furnished</SelectItem>
              <SelectItem value="Unfurnished">Unfurnished</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tenant Type */}
        <div>
          <Label className="text-base font-medium">Preferred Tenant</Label>
          <Select
            value={filters.tenantType || ""}
            onValueChange={(value) => updateFilter('tenantType', value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select tenant type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Boys">Boys</SelectItem>
              <SelectItem value="Girls">Girls</SelectItem>
              <SelectItem value="Boys & Girls">Boys & Girls</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
              <SelectItem value="Company">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Features */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Property Features</Label>
          <div className="space-y-3">
            {[
              { key: 'studentAllowed', label: 'Students Allowed' },
              { key: 'coupleAllowed', label: 'Couples Allowed' },
              { key: 'fullyIndependent', label: 'Fully Independent' },
              { key: 'ownerFree', label: 'Owner Free' },
              { key: 'rentNegotiable', label: 'Rent Negotiable' },
              { key: 'photoOnly', label: 'With Photos Only' },
              { key: 'primeOnly', label: 'Prime Properties Only' },
            ].map((feature) => (
              <div key={feature.key} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                <Label className="font-medium">{feature.label}</Label>
                <Switch
                  checked={filters[feature.key as keyof SearchFilters] as boolean || false}
                  onCheckedChange={(checked) => updateFilter(feature.key as keyof SearchFilters, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="outline" onClick={onClearFilters} className="w-full">
            <X className="h-4 w-4 mr-2" />
            Clear All Filters ({activeFiltersCount})
          </Button>
        )}
      </div>
    </Card>
  );
});

FilterPanel.displayName = 'FilterPanel';

export default FilterPanel;
