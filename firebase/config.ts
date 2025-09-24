import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
// @ts-ignore
import { Auth, getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyAZxP78x_gBnGouPm2aH2nwkujLoIZMtFE",
  authDomain: "fiap-backend-bytebank.firebaseapp.com",
  projectId: "fiap-backend-bytebank",
  storageBucket: "fiap-backend-bytebank.firebasestorage.app",
  messagingSenderId: "498778251857",
  appId: "1:498778251857:web:de33ea34bc323c8625ce70",
  measurementId: "G-88CXHYTFST",
};

let app: FirebaseApp;
let auth: Auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
} else {
  app = getApp();
  auth = getAuth(app);
}

export { app, auth };
