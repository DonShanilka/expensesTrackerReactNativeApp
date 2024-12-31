import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'https://student-api.acpt.lk/api', // Replace with your API base URL
});

// instance.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('login');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default instance;
