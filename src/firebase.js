import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
<<<<<<< HEAD
   apiKey: "AIzaSyDqC2OcqbBTWGGI6Qn46KNg8kMQ9_dRVeE",
=======
  apiKey: "AIzaSyDqC2OcqbBTWGGI6Qn46KNg8kMQ9_dRVeE",
>>>>>>> 71167c728e7e839aad779a350fb89da9de240c08
  authDomain: "kumien-b2486.firebaseapp.com",
  projectId: "kumien-b2486",
  storageBucket: "kumien-b2486.firebasestorage.app",
  messagingSenderId: "872654517059",
  appId: "1:872654517059:web:9408a7b3c621aee53e75f6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
