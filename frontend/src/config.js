// frontend/src/config.js
import { fetchData } from './api';
// Use the environment variable if set, otherwise default to localhost.
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
export default apiUrl;