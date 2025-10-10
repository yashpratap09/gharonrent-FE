"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Building2, Home, Warehouse, Hotel, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LocationSearchOptimized } from "./LocationSearchOptimized";
import { PlaceDetails } from "@/lib/api/places";

export const Hero = () => {
  const [propertyType, setPropertyType] = useState("flat");
  const [location, setLocation] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const router = useRouter();

  const handleLocationSelect = (place: PlaceDetails) => {
    setSelectedPlace(place);
    setLocation(place.name || place.formatted_address);
  };

  const handleLocationInputChange = (value: string) => {
    setLocation(value);
    // Clear selected place if user types manually
    if (selectedPlace && value !== selectedPlace.name && value !== selectedPlace.formatted_address) {
      setSelectedPlace(null);
    }
  };

  const handleSearch = () => {
    if (location.trim()) {
      // Build SEO-friendly search URL
      const locationSlug = location.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
      const typeSlug = propertyType.toLowerCase();
      
      // Use selected place coordinates if available, otherwise fallback to dummy coordinates
      let coords = { lat: 28.7041, lng: 77.1025 }; // Default Delhi coordinates
      
      if (selectedPlace?.geometry) {
        coords = selectedPlace.geometry;
      } else {
        // Fallback to dummy coordinates for common cities
        const cityCoordinates: Record<string, { lat: number; lng: number }> = {
          "chandigarh": { lat: 30.7333148, lng: 76.7794179 },
          "mohali": { lat: 30.7046, lng: 76.7179 },
          "delhi": { lat: 28.7041, lng: 77.1025 },
          "mumbai": { lat: 19.0760, lng: 72.8777 },
          "bangalore": { lat: 12.9716, lng: 77.5946 },
          "pune": { lat: 18.5204, lng: 73.8567 },
        };
        
        const locationKey = location.toLowerCase().replace(/[^a-z]/g, '');
        coords = cityCoordinates[locationKey] || coords;
      }
      
      const searchUrl = `/search/${typeSlug}-for-rent-in-${locationSlug}/${typeSlug}/${coords.lat}/${coords.lng}`;
      router.push(searchUrl);
    } else {
      router.push('/search');
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-4 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://user-gen-media-assets.s3.amazonaws.com/seedance_videos/04d93625-326b-4268-92f1-20f2e41b67f8.mp4" type="video/mp4" />
          <source src="https://user-gen-media-assets.s3.amazonaws.com/seedance_videos/04d93625-326b-4268-92f1-20f2e41b67f8.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 text-white">
            Find Your Perfect{" "}
            <span className="text-orange">
              Rental Home
            </span>
          </h1>
          
        </div>
        
        <div className="max-w-4xl mx-auto animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-400">
          <div className="bg-background/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-border">
            <ToggleGroup
              type="single"
              value={propertyType}
              onValueChange={(value) => value && setPropertyType(value)}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              <ToggleGroupItem 
                value="flat" 
                className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                aria-label="Toggle Flats"
              >
                <Building2 className="h-5 w-5" />
                <span>Flats/Apartments</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="room" 
                className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                aria-label="Toggle Houses"
              >
                <Home className="h-5 w-5" />
                <span>Rooom</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="pg" 
                className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                aria-label="Toggle PG"
              >
                <Hotel className="h-5 w-5" />
                <span>PG/Hostels</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="commercial" 
                className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                aria-label="Toggle Commercial"
              >
                <Warehouse className="h-5 w-5" />
                <span>Commercial</span>
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <LocationSearchOptimized
                  placeholder="Enter city, area, or landmark"
                  initialValue={location}
                  onLocationSelect={handleLocationSelect}
                  onInputChange={handleLocationInputChange}
                />
              </div>
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg rounded-xl bg-orange hover:bg-orange/90 text-white shadow-orange-lg hover:shadow-orange transition-all duration-200" 
                onClick={handleSearch}
              >
                <Search className="h-5 w-5 mr-2" />
                <span>Search Properties</span>
              </Button>
            </div>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-white/90 my-12 max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-200">
            Discover amazing rental properties from apartments to houses. Your dream home is just a search away.
          </p>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-600">
          {[
            { number: "10,000+", label: "Properties" },
            { number: "5,000+", label: "Happy Tenants" },
            { number: "100+", label: "Cities" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="group">
              <h3 className="text-3xl md:text-4xl font-bold text-orange mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </h3>
              <p className="text-white/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};