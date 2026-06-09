import { Platform } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import { auth } from './firebase';

// ============================================
// 🐾 AUTO-DETECCAO DO IP DO BACKEND
// ============================================

function descobrirIp() {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    if (ip && ip !== 'localhost' && ip !== '127.0.0.1') {
      return ip;
    }
  }

  if (Platform.OS === 'android') return '10.0.2.2';
  return 'localhost';
}

const API_URL = `http://${descobrirIp()}:8080/api`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para enviar o UID do Firebase em toda requisição
api.interceptors.request.use((config) => {
  const user = auth.currentUser;
  if (user) {
    config.headers['X-User-Id'] = user.uid;
  }
  return config;
});

export const petService = {
  findAll: () => api.get('/pets'),
  findById: (id) => api.get(`/pets/${id}`),
  create: (p) => api.post('/pets', p),
  update: (id, p) => api.put(`/pets/${id}`, p),
  delete: (id) => api.delete(`/pets/${id}`),
  updatePhoto: (id, url) =>
    api.put(`/pets/${id}/photo`, url, {
      headers: { 'Content-Type': 'text/plain' },
    }),
};

export default api;
