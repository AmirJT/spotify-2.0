export const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/playlist/user/1');    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};