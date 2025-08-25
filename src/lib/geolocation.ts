// Simple IP geolocation utility for state detection hints
export interface LocationHint {
  state?: string;
  country?: string;
  confidence: 'high' | 'medium' | 'low';
}

// Free IP geolocation service
const GEOLOCATION_API = 'https://ipapi.co/json/';

export async function detectUserLocation(): Promise<LocationHint> {
  try {
    const response = await fetch(GEOLOCATION_API);
    const data = await response.json();
    
    if (data.region_code && data.country_code === 'US') {
      return {
        state: data.region_code,
        country: data.country_code,
        confidence: 'high'
      };
    } else if (data.country_code === 'US') {
      return {
        country: data.country_code,
        confidence: 'medium'
      };
    } else {
      return {
        country: data.country_code,
        confidence: 'low'
      };
    }
  } catch (error) {
    console.warn('Could not detect user location:', error);
    return {
      confidence: 'low'
    };
  }
}

// Check if detected state is California
export function isLikelyCalifornia(locationHint: LocationHint): boolean {
  return locationHint.state === 'CA' && locationHint.confidence === 'high';
}

// Get state suggestion text
export function getStateSuggestionText(locationHint: LocationHint): string | null {
  if (locationHint.state && locationHint.state !== 'CA') {
    return `We detected you're in ${locationHint.state}. Our platform is optimized for California, but you can still explore your options.`;
  }
  return null;
}
