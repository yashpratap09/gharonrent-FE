export interface SearchUrlParams {
  propertyType?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

// Parse search URL like: search/Room-for-rent-in-Chandigarh-India/room/30.7333148/76.7794179
export function parseSearchUrl(params: string[]): SearchUrlParams {
  const result: SearchUrlParams = {};
  
  if (params.length >= 1) {
    // Decode the search string to handle URL-encoded characters
    const searchString = decodeURIComponent(params[0]);
    
    // Extract location after "in-" - match everything after "in-" until end of string
    // The location is the last part before the next URL segment
    const locationMatch = searchString.match(/in-([a-zA-Z0-9\s-]+)$/i);
    if (locationMatch) {
      result.location = locationMatch[1].replace(/-/g, ' ').trim();
    }
    
    // Extract property type from the beginning
    const typeMatch = searchString.match(/^([a-z]+)/i);
    if (typeMatch) {
      const type = typeMatch[1].toLowerCase();
      if (type === 'room') result.propertyType = 'Room';
      else if (type === 'flat' || type === 'apartment') result.propertyType = 'Flat';
      else if (type === 'pg') result.propertyType = 'PG';
      else if (type === 'commercial') result.propertyType = 'Commercial';
    }
  }
  
  if (params.length >= 2) {
    // Property type confirmation - decode to handle URL encoding
    const typeParam = decodeURIComponent(params[1]).toLowerCase();
    if (typeParam === 'room') result.propertyType = 'Room';
    else if (typeParam === 'flat' || typeParam === 'apartment') result.propertyType = 'Flat';
    else if (typeParam === 'pg') result.propertyType = 'PG';
    else if (typeParam === 'commercial') result.propertyType = 'Commercial';
  }
  
  if (params.length >= 3) {
    // Latitude - decode and parse
    const latParam = decodeURIComponent(params[2]);
    const lat = parseFloat(latParam);
    if (!isNaN(lat)) result.latitude = lat;
  }
  
  if (params.length >= 4) {
    // Longitude - decode and parse
    const lngParam = decodeURIComponent(params[3]);
    const lng = parseFloat(lngParam);
    if (!isNaN(lng)) result.longitude = lng;
  }
  
  return result;
}

// Build search URL from filters
export function buildSearchUrl(filters: any): string {
  const { propertyType, location, latitude, longitude } = filters;
  
  // Location is required for a meaningful search URL
  if (!location) {
    return '/search';
  }
  
  // Validate and sanitize inputs
  const sanitizeString = (str: string): string => {
    if (!str || typeof str !== 'string') return '';
    // Remove excessive repetition and limit length
    return str
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .replace(/(-)\1{2,}/g, '$1') // Replace 3+ consecutive dashes with single dash
      .substring(0, 100); // Limit segment length
  };
  
  // Create URL segments without encoding here - let Next.js handle the encoding
  const segments = [];
  
  if (propertyType && location) {
    const typeSlug = sanitizeString(propertyType.toLowerCase());
    const locationSlug = sanitizeString(location);
    if (typeSlug && locationSlug) {
      segments.push(`${typeSlug}-for-rent-in-${locationSlug}`);
      segments.push(typeSlug);
    }
  } else if (location) {
    const locationSlug = sanitizeString(location);
    if (locationSlug) {
      segments.push(`properties-for-rent-in-${locationSlug}`);
    }
  }
  
  // Add coordinates if available
  if (latitude && longitude) {
    // Convert to string and validate as numbers
    const lat = parseFloat(String(latitude));
    const lng = parseFloat(String(longitude));
    if (!isNaN(lat) && !isNaN(lng)) {
      segments.push(lat.toString(), lng.toString());
    }
  }
  
  // Return search URL or default if no valid segments
  if (segments.length === 0) {
    return '/search';
  }
  
  // Join with slashes - Next.js will handle the proper URL encoding
  return `/search/${segments.join('/')}`;
}

// Extract location from URL string
export function extractLocationFromUrl(searchString: string): string {
  const locationMatch = searchString.match(/in-([^-]+(?:-[^-]+)*)/i);
  return locationMatch ? locationMatch[1].replace(/-/g, ' ') : '';
}

// Generate SEO-friendly title from search parameters
export function generateSearchTitle(filters: any): string {
  const { propertyType, location } = filters;
  
  if (propertyType && location) {
    return `${propertyType} for Rent in ${location} | RentHaven`;
  } else if (location) {
    return `Properties for Rent in ${location} | RentHaven`;
  } else if (propertyType) {
    return `${propertyType} for Rent | RentHaven`;
  }
  
  return 'Search Properties | RentHaven';
}

// Generate SEO-friendly description from search parameters
export function generateSearchDescription(filters: any, totalProperties: number): string {
  const { propertyType, location } = filters;
  
  let description = `Find ${totalProperties > 0 ? `${totalProperties}+` : ''} `;
  
  if (propertyType) {
    description += `${propertyType.toLowerCase()} properties `;
  } else {
    description += 'rental properties ';
  }
  
  if (location) {
    description += `for rent in ${location}. `;
  } else {
    description += 'for rent. ';
  }
  
  description += 'Verified listings, transparent pricing, and 24/7 support on RentHaven.';
  
  return description;
}