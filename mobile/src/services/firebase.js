import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDsvRmRwXtN3T_NjehoF9p-dHduCV3DY78',
  authDomain: 'cantinhopet-b344b.firebaseapp.com',
  projectId: 'cantinhopet-b344b',
  storageBucket: 'cantinhopet-b344b.firebasestorage.app',
  messagingSenderId: '84862287944',
  appId: '1:84862287944:web:e02585a97e3195b1fb987d',
  measurementId: 'G-VP11ERTZWK',
};

const app = initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export { auth };
export default app;
