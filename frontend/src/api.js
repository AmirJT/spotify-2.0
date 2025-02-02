// frontend/src/api.js
import apiUrl from './config';  // We'll also create this file in the next step

// Example function that fetches data from your backend API
export const fetchData = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/some-endpoint`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};