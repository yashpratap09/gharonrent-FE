"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SlidersHorizontal, 
  MapPin, 
  Filter,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import GridCard from "@/components/properties/GridCard";
import { parseSearchUrl, buildSearchUrl } from "@/lib/searchUtils";
import { useDebounce } from "@/hooks/useDebounce";
import FilterPanel, { SearchFilters } from "./FilterPanel";

const defaultFilters: SearchFilters = {
  propertyType: null,
  location: null,
  minRent: null,
  maxRent: null,
  bedrooms: null,
  furnishType: null,
  tenantType: null,
  studentAllowed: null,
  coupleAllowed: null,
  fullyIndependent: null,
  ownerFree: null,
  rentNegotiable: null,
  photoOnly: null,
  primeOnly: null,
  page: 1,
  limit: 12,
};

export const AdvancedSearchResults = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const debouncedFilters = useDebounce(filters, 300);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const isUpdatingUrl = useRef(false);

  const { usePropertiesQuery } = useProperties();

  // Memoize the parsed filters to prevent unnecessary re-parsing
  const parsedUrlFilters = useMemo(() => {
    if (params.params && Array.isArray(params.params)) {
      return parseSearchUrl(params.params as string[]);
    }
    return {};
  }, [params.params]);

  // Memoize the query parameters
  const queryFilters = useMemo(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const result: Partial<SearchFilters> = {};
    urlParams.forEach((value, key) => {
      if (key === 'minRent' || key === 'maxRent' || key === 'page' || key === 'limit') {
        result[key] = parseInt(value) || (key === 'page' ? 1 : key === 'limit' ? 12 : 0);
      } else if (key === 'studentAllowed' || key === 'coupleAllowed' || key === 'fullyIndependent' || 
                 key === 'ownerFree' || key === 'rentNegotiable' || key === 'photoOnly' || key === 'primeOnly') {
        result[key] = value === 'true';
      } else {
        (result as any)[key] = value;
      }
    });
    return result;
  }, [searchParams]);

  // Initialize filters only once
  useEffect(() => {
    if (!isInitialized) {
      const initialFilters = { ...defaultFilters, ...parsedUrlFilters, ...queryFilters };
      setFilters(initialFilters);
      setIsInitialized(true);
    }
  }, [parsedUrlFilters, queryFilters, isInitialized]);

  // Update URL when debouncedFilters change
  useEffect(() => {
    if (!isInitialized) return;
    if (isUpdatingUrl.current) return;
    // Only update URL if at least location or propertyType is set
    if (!debouncedFilters.location && !debouncedFilters.propertyType) return;
    isUpdatingUrl.current = true;
    const searchUrl = buildSearchUrl(debouncedFilters);
    const queryParams = new URLSearchParams();
    Object.entries(debouncedFilters).forEach(([key, value]) => {
      if (value !== defaultFilters[key as keyof SearchFilters] && 
          value !== "" && value !== false && value !== 0 && value !== null) {
        queryParams.set(key, value!.toString());
      }
    });
    const queryString = queryParams.toString();
    const fullUrl = queryString ? `${searchUrl}?${queryString}` : searchUrl;
    router.replace(fullUrl, { scroll: false });
    setTimeout(() => {
      isUpdatingUrl.current = false;
    }, 100);
  }, [debouncedFilters, router, isInitialized]);

  // When building the query for usePropertiesQuery, only include non-null filters
  const filterQuery = useMemo(() => {
    const q: any = {};
    Object.entries(debouncedFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        q[key] = value;
      }
    });
    return q;
  }, [debouncedFilters]);

  // Fetch properties with debounced filters
  const { data, isLoading } = usePropertiesQuery({
    ...filterQuery,
    sortBy: "createdAt",
    sortOrder: "desc"
  }, isInitialized && (!debouncedFilters.location || !!debouncedFilters.location) && !isUpdatingUrl.current);

  const properties = data?.properties || [];
  const totalProperties = data?.totalProperties || 0;
  const totalPages = data?.totalPages || 1;
  const currentPage = debouncedFilters.page;
  const hasNext = data?.hasNext || false;
  const hasPrev = data?.hasPrev || false;

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    // Close mobile filter sheet after a short delay
    if (isFilterOpen) {
      setTimeout(() => setIsFilterOpen(false), 300);
    }
  }, [isFilterOpen]);

  // Handle page changes
  const handlePageChange = useCallback((newPage: number) => {
    setFilters(prevFilters => ({ ...prevFilters, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setIsFilterOpen(false);
    router.replace("/search");
  }, [router]);

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    return Object.entries(debouncedFilters).filter(([key, value]) => {
      if (key === 'location' || key === 'latitude' || key === 'longitude' || key === 'page' || key === 'limit') return false;
      return value !== defaultFilters[key as keyof SearchFilters] && 
             value !== "" && value !== false && value !== 0;
    }).length;
  }, [debouncedFilters]);

  const Pagination = () => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrev || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            disabled={isLoading}
          >
            {page}
          </Button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNext || isLoading}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Initializing search...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {debouncedFilters.propertyType && debouncedFilters.location ? 
                  `${debouncedFilters.propertyType} for rent in ${debouncedFilters.location}` :
                  debouncedFilters.location ? `Properties for rent in ${debouncedFilters.location}` :
                  debouncedFilters.propertyType ? `${debouncedFilters.propertyType} for rent` :
                  'All Properties'
                }
              </h1>
              <div className="flex items-center gap-2">
                {isLoading && (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                )}
                <p className="text-muted-foreground">
                  {isLoading ? "Searching properties..." : 
                   !debouncedFilters.location && !debouncedFilters.propertyType ? `Found ${totalProperties} properties • Page ${currentPage} of ${totalPages}` :
                   !debouncedFilters.location ? "Please select a location to search properties" :
                   `Found ${totalProperties} properties • Page ${currentPage} of ${totalPages}`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="px-3 py-1">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                </Badge>
              )}
              
              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2 px-2 py-0 text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80 sm:w-96">
                  <SheetHeader>
                    <SheetTitle className="flex items-center">
                      <Filter className="h-5 w-5 mr-2" />
                      Filter Properties
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 overflow-y-auto max-h-[calc(100vh-120px)]">
                    <FilterPanel
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      onClearFilters={handleClearFilters}
                      activeFiltersCount={activeFiltersCount}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(debouncedFilters).map(([key, value]) => {
                if (key === 'location' || key === 'latitude' || key === 'longitude' || key === 'page' || key === 'limit') return null;
                if (value === defaultFilters[key as keyof SearchFilters] || 
                    value === "" || value === false || value === 0) return null;
                return (
                  <Badge key={key} variant="secondary" className="px-3 py-1">
                    {key === 'minRent' ? `Min: ₹${value}` :
                     key === 'maxRent' ? `Max: ₹${value}` :
                     key === 'propertyType' ? value :
                     key === 'bedrooms' ? `${value} BHK` :
                     key === 'furnishType' ? value :
                     key === 'tenantType' ? value :
                     key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                    }
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => {
                        const newFilters = { ...filters };
                        (newFilters as any)[key] = 
                          typeof defaultFilters[key as keyof SearchFilters] === 'boolean' ? null : 
                          typeof defaultFilters[key as keyof SearchFilters] === 'number' ? null : null;
                        newFilters.page = 1;
                        setFilters(newFilters);
                      }}
                    />
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </div>
          {/* Property Results Grid */}
          <div className="flex-1">
            {!debouncedFilters.location && !debouncedFilters.propertyType ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a Location</h3>
                  <p className="text-muted-foreground">
                    Please select a location from the filter to start searching for properties.
                  </p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
                  <span className="text-lg text-muted-foreground">Searching properties...</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-muted rounded-t-lg"></div>
                      <div className="p-6 space-y-4">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="flex justify-between">
                          <div className="h-4 bg-muted rounded w-1/3"></div>
                          <div className="h-4 bg-muted rounded w-1/4"></div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters to find more properties in {debouncedFilters.location}.
                  </p>
                </div>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <GridCard key={property._id} property={property} />
                  ))}
                </div>
                {/* Pagination */}
                {totalPages > 1 && <Pagination />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};