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
    // Parse the main search string like "Room-for-rent-in-Chandigarh-India"
    const searchString = params[0];
    
    // Extract location after "in-"
    const locationMatch = searchString.match(/in-([^-]+(?:-[^-]+)*)/i);
    if (locationMatch) {
      result.location = locationMatch[1].replace(/-/g, ' ');
    }
    
    // Extract property type from the beginning
    const typeMatch = searchString.match(/^([^-]+)/);
    if (typeMatch) {
      const type = typeMatch[1].toLowerCase();
      if (type === 'room') result.propertyType = 'Room';
      else if (type === 'flat' || type === 'apartment') result.propertyType = 'Flat';
      else if (type === 'pg') result.propertyType = 'PG';
      else if (type === 'commercial') result.propertyType = 'Commercial';
    }
  }
  
  if (params.length >= 2) {
    // Property type confirmation
    const typeParam = params[1].toLowerCase();
    if (typeParam === 'room') result.propertyType = 'Room';
    else if (typeParam === 'flat' || typeParam === 'apartment') result.propertyType = 'Flat';
    else if (typeParam === 'pg') result.propertyType = 'PG';
    else if (typeParam === 'commercial') result.propertyType = 'Commercial';
  }
  
  if (params.length >= 3) {
    // Latitude
    const lat = parseFloat(params[2]);
    if (!isNaN(lat)) result.latitude = lat;
  }
  
  if (params.length >= 4) {
    // Longitude
    const lng = parseFloat(params[3]);
    if (!isNaN(lng)) result.longitude = lng;
  }
  
  return result;
}

// Build search URL from filters
export function buildSearchUrl(filters: any): string {
  const { propertyType, location, latitude, longitude } = filters;
  
  if (!propertyType && !location) {
    return '/search';
  }
  
  // Create URL segments without encoding here - let Next.js handle the encoding
  const segments = [];
  
  if (propertyType && location) {
    const typeSlug = propertyType.toLowerCase();
    const locationSlug = location.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    segments.push(`${typeSlug}-for-rent-in-${locationSlug}`);
    
    // Add property type as a separate segment
    segments.push(typeSlug);
  } else if (location) {
    const locationSlug = location.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    segments.push(`properties-for-rent-in-${locationSlug}`);
  } else if (propertyType) {
    const typeSlug = propertyType.toLowerCase();
    segments.push(`${typeSlug}-for-rent`);
    segments.push(typeSlug);
  }
  
  // Add coordinates if available
  if (latitude && longitude) {
    // Convert to string and remove any existing encoding
    const lat = String(latitude).split('?')[0].split('&')[0];
    const lng = String(longitude).split('?')[0].split('&')[0];
    segments.push(lat, lng);
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