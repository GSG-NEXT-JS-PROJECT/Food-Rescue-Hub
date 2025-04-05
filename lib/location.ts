
// Function to reverse geocode lat/lng to address
export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].formatted_address; // Return the first formatted address
    }
    return `${lat}, ${lng}`; // Fallback to coordinates if geocoding fails
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return `${lat}, ${lng}`; // Fallback to coordinates on error
  }
};