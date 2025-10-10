"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Upload, ImagePlus } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const AddProperty = () => {
  const router = useRouter();
  const { createProperty, isCreatingProperty } = useProperties();
  const { isAuthenticated } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bedroom: 0,
    washroom: 0,
    squareFeet: 0,
    carParking: false,
    floor: 0,
    rent: 0,
    securityDeposit: 0,
    address: "",
    fullAddress: "",
    propertyType: "",
    category: "",
    furnishTypes: "",
    livingCoupleAllowed: false,
    fullyIndependent: false,
    studentAllowed: false,
    ownerFree: false,
    rentNegotiable: false,
    brokerage: 0,
    brokerageFeeType: "",
    amenities: [] as string[],
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.rent) {
      return;
    }

    const propertyData = {
      ...formData,
      images,
    };

    createProperty(propertyData, );  
    {
      // onSuccess: () => {
      //   router.push('/');
      // }
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-muted-foreground hover:text-primary transition-colors group"
        >
          <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <Card className="w-full shadow-2xl border-0 bg-background/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              List Your Property
            </CardTitle>
            <CardDescription className="text-lg">
              Fill in the details to showcase your property to thousands of potential tenants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Property Type Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center">
                  Property Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base">Listing Type</Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="broker">Broker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Property Category</Label>
                    <Select onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="broker">Broker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Property Category</Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Basic Details Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base">Bedrooms</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      placeholder="Number of bedrooms" 
                      className="h-12"
                      value={formData.bedroom}
                      onChange={(e) => handleInputChange('bedroom', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Bathrooms</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      placeholder="Number of bathrooms" 
                      className="h-12"
                      value={formData.washroom}
                      onChange={(e) => handleInputChange('washroom', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Square Feet</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      placeholder="Total area in sq ft" 
                      className="h-12"
                      value={formData.squareFeet}
                      onChange={(e) => handleInputChange('squareFeet', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Floor</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      placeholder="Floor number" 
                      className="h-12"
                      value={formData.floor}
                      onChange={(e) => handleInputChange('floor', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Monthly Rent (₹)</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      placeholder="Monthly rent amount" 
                      className="h-12"
                      value={formData.rent}
                      onChange={(e) => handleInputChange('rent', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Parking Spaces</Label>
                    <Switch 
                      checked={formData.carParking}
                      onCheckedChange={(checked) => handleInputChange('carParking', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Location Details</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base">Street Address</Label>
                    <Input 
                      placeholder="Enter street address" 
                      className="h-12"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Complete Address</Label>
                    <Textarea 
                      placeholder="Enter complete address with landmarks" 
                      className="min-h-[100px]"
                      value={formData.fullAddress}
                      onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base">City</Label>
                      <Input placeholder="Enter city" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base">State</Label>
                      <Input placeholder="Enter state" className="h-12" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Property Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Fully Independent", key: "independent" },
                    { label: "Couples Allowed", key: "couples" },
                    { label: "Students Allowed", key: "students" },
                    { label: "Owner Free", key: "ownerFree" },
                    { label: "Rent Negotiable", key: "negotiable" },
                    { label: "Pets Allowed", key: "pets" },
                  ].map((feature) => (
                    <div key={feature.key} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                      <Label className="text-base font-medium">{feature.label}</Label>
                      <Switch 
                        checked={formData[feature.key as keyof typeof formData] as boolean}
                        onCheckedChange={(checked) => handleInputChange(feature.key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Furnishing Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Furnishing & Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base">Furnishing Type</Label>
                    <Select onValueChange={(value) => handleInputChange('furnishTypes', value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select furnishing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fully">Fully Furnished</SelectItem>
                        <SelectItem value="semi">Semi Furnished</SelectItem>
                        <SelectItem value="unfurnished">Unfurnished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Security Deposit (₹)</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      placeholder="Security deposit amount" 
                      className="h-12"
                      value={formData.securityDeposit}
                      onChange={(e) => handleInputChange('securityDeposit', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              {/* Images Upload */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Property Images</h3>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="images"
                    onChange={handleImageUpload}
                  />
                  <Label
                    htmlFor="images"
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                      <ImagePlus className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-lg font-medium mb-2">
                      Upload Property Images
                    </span>
                    <span className="text-muted-foreground">
                      Click to browse or drag and drop images here
                    </span>
                  </Label>
                  {images.length > 0 && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <p className="text-primary font-medium">
                        {images.length} image{images.length > 1 ? 's' : ''} selected
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Property Description</h3>
                <div className="space-y-2">
                  <Label className="text-base">Detailed Description</Label>
                  <Input 
                    placeholder="Property title" 
                    className="h-12 mb-4"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                  <Textarea
                    placeholder="Describe your property, nearby amenities, transportation, and what makes it special..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isCreatingProperty}
                >
                  {isCreatingProperty ? "Creating Property..." : "List My Property"}
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Your property will be reviewed and published within 24 hours
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProperty;