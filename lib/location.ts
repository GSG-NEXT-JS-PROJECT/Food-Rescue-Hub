
// Function to reverse geocode lat/lng to address (Geoapify)
export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY!;
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${GEOAPIFY_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted; // Return the first formatted address
    }
    return `${lat}, ${lng}`; // Fallback to coordinates if geocoding fails
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return `${lat}, ${lng}`; // Fallback to coordinates on error
  }
};
