import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where, orderBy,
  serverTimestamp, getDoc,
  updateDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDFUrYFJ6iRK22VTw34PeoAQW_m8UWgBHw",
    authDomain: "uas-bdd-teori-kelompok.firebaseapp.com",
    projectId: "uas-bdd-teori-kelompok",
    storageBucket: "uas-bdd-teori-kelompok.appspot.com",
    messagingSenderId: "242970064386",
    appId: "1:242970064386:web:9a4e2a54c57b4b49bc991b"
  };


 // init firebase app 
initializeApp(firebaseConfig)

//  init services
const db = getFirestore()

// collection ref
const colref = collection(db, 'books')

// queries
const q = query(colref, orderBy('createdAt'))

// real time collection data
  onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({...doc.data(), id: doc.id })
    })
    console.log(books)
  })

  // adding documents
  const addBookFrom = document.querySelector('.add')
  addBookFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colref, {
      title: addBookFrom.title.value,
      author: addBookFrom.author.value,
      createdAt: serverTimestamp()
    })
    .then(() => {
      addBookFrom.reset()
    })

  })

  // deleting documents
  const deleteBookFrom = document.querySelector('.delete')
  deleteBookFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    const docref = doc(db, 'books', deleteBookFrom.id.value)

    deleteDoc(docref)
    .then(() => {
      deleteBookFrom.reset()
    })

  })

// get a single document
const docref = doc(db, 'books', 'Y33ucvDQxfopKUsHCxMe')

onSnapshot(docref, (doc) => {
  console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docref = doc(db, 'books', updateForm.id.value)

  updateDoc(docref, {
    title: 'update title'
  })
  .then(() => {
    updateForm.reset()
  })

})