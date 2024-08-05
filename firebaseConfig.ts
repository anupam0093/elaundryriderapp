// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAX7Msihyn74_yUf5vPKysvJel308u0i9s",
  authDomain: "e-laundry-70974.firebaseapp.com",
  projectId: "e-laundry-70974",
  storageBucket: "e-laundry-70974.appspot.com",
  messagingSenderId: "352876003499",
  appId: "1:352876003499:android:ced796aa072b8dc35877ee"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
