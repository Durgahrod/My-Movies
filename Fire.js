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
  getMovies(callback) {
    const q = query(collection(db, 'movies'), orderBy('title', 'asc'))
    onSnapshot(q, snapshot => {
      let movies = []
      snapshot.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() })
      })
      callback(movies)
    })
  }

  getMoviesDesc(callback) {
    const q = query(collection(db, 'movies'), orderBy('title', 'desc'))
    onSnapshot(q, snapshot => {
      let movies = []
      snapshot.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() })
      })
      callback(movies)
    })
  }

  getMoviesSecret(callback) {
    const q = query(collection(db, 'movies-secret'), orderBy('title', 'asc'))
    onSnapshot(q, snapshot => {
      let movies = []
      snapshot.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() })
      })
      callback(movies)
    })
  }

  getMoviesSecretDesc(callback) {
    const q = query(collection(db, 'movies-secret'), orderBy('title', 'desc'))
    onSnapshot(q, snapshot => {
      let movies = []
      snapshot.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() })
      })
      callback(movies)
    })
  }


  addMovie(movie, secret) {
    if (secret == false) {
      addDoc(collection(db, 'movies'), movie)
    } else {
      addDoc(collection(db, 'movies-secret'), movie)
    }
  }

  updateMovie(movie, secret) {
    if (secret == false) {
      updateDoc(doc(db, 'movies', movie.id), movie)
    } else {
      updateDoc(doc(db, 'movies-secret', movie.id), movie)
    }
  }

  deleteMovie(movie, secret) {
    if (secret == false) {
      deleteDoc(doc(db, 'movies', movie.id))
    } else {
      deleteDoc(doc(db, 'movies-secret', movie.id))
    }
  }
}
