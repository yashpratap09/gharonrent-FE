"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Building2, Home, Warehouse, Hotel, Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const [propertyType, setPropertyType] = useState("flat");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search?type=${propertyType}&location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Rental Home
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-200">
            Discover amazing rental properties from apartments to houses. Your dream home is just a search away.
          </p>
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
                <span>Apartments</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="house" 
                className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                aria-label="Toggle Houses"
              >
                <Home className="h-5 w-5" />
                <span>Houses</span>
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
              <div className="flex-grow relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter city, area, or landmark"
                  className="w-full h-14 pl-12 text-lg rounded-xl border-2 focus:border-primary"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-200" 
                onClick={handleSearch}
              >
                <Search className="h-5 w-5 mr-2" />
                <span>Search Properties</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-600">
          {[
            { number: "10,000+", label: "Properties" },
            { number: "5,000+", label: "Happy Tenants" },
            { number: "100+", label: "Cities" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="group">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </h3>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};