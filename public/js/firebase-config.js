// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyB8zd4EOEIKJWx4C55tqS6xHisoFKmIVP8",
  authDomain: "dianastuff-e8911.firebaseapp.com",
  projectId: "dianastuff-e8911",
  storageBucket: "dianastuff-e8911.firebasestorage.app",
  messagingSenderId: "446791438602",
  appId: "1:446791438602:web:bd522bef76f17c42696af3",
  measurementId: "G-FXL9K9X1P5"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias a los servicios
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();