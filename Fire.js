import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD_LVJ1_H2p9SC1gAoIhvMTFB4RJXgxWZA",
  authDomain: "my-movies-ab039.firebaseapp.com",
  projectId: "my-movies-ab039",
  storageBucket: "my-movies-ab039.appspot.com",
  messagingSenderId: "528906934440",
  appId: "1:528906934440:web:683911ced02167c5374a9d"
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default class Fire {
  getMovies (callback) {
    const q = query(collection(db, 'movies'), orderBy('title', 'asc'))
    onSnapshot(q, snapshot => {
      let movies = []
      snapshot.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() })
      })
      callback(movies)
    })
  }

  
  addMovie (movie) {
    addDoc(collection(db, 'movies'), movie)
  }

  updateMovie (movie) {
    updateDoc(doc(db, 'movies', movie.id), movie)
  }

  deleteMovie (movie) {
    deleteDoc(doc(db, 'movies', movie.id))
  }
}
