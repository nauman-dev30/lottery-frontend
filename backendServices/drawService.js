import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`;

/**
 * Fetches all draws from the backend
 * @returns {Promise} Promise that resolves to the draws data
 */
export const fetchAllDraws = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/getData`);
    return response.data;
  } catch (error) {
    console.error('Error fetching draws:', error);
    throw error;
  }
};

/**
 * Fetches the latest draw from the backend
 * @returns {Promise} Promise that resolves to the latest draw data
 */
export const fetchLatestDraw = async () => {
  try {
    const response = await fetchAllDraws();
    if (response.success && response.data && response.data.length > 0) {
      // Sort by drawId in descending order to ensure the highest ID is first
      const sortedData = response.data.sort((a, b) => {
        const idA = Number(a.drawId) || 0;
        const idB = Number(b.drawId) || 0;
        return idB - idA; // Descending order: higher IDs first
      });
      return sortedData[0]; // Return the draw with the highest ID
    }
    return null;
  } catch (error) {
    console.error('Error fetching latest draw:', error);
    throw error;
  }
};