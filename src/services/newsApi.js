// src/services/newsApi.js 🥷
import { db } from './firebase'
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  doc, 
  getDoc, 
  addDoc,
  deleteDoc, // ✅ FALTABA ESTE
  updateDoc
} from 'firebase/firestore'

// 1. Traer la lista de noticias (para la Home/Dashboard)
export const fetchNews = async (max = 10) => {
  try {
    const q = query(collection(db, 'news'), orderBy('publishedAt', 'desc'), limit(max))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) { 
    console.error("Error al traer lista de noticias")
    return [] 
  }
}

// 2. Traer una noticia específica por su ID (para el NewsDetail)
export const fetchNewsById = async (id) => {
  try {
    const d = await getDoc(doc(db, 'news', id))
    return d.exists() ? { id: d.id, ...d.data() } : null
  } catch (e) { 
    console.error("Error al buscar noticia por ID")
    return null 
  }
}

// 3. Escribir un comentario nuevo (Pauta Módulo 8) 💬
export const addComment = async (newsId, data) => {
  try {
    const col = collection(db, 'news', newsId, 'comments')
    const ref = await addDoc(col, { 
      ...data, 
      createdAt: new Date().toISOString() 
    })
    return { id: ref.id, success: true }
  } catch (e) { 
    console.error("Error al guardar comentario")
    return { success: false } 
  }
}

// 4. Traer los comentarios de una noticia específica
export const fetchComments = async (newsId) => {
  try {
    const q = query(collection(db, 'news', newsId, 'comments'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) { 
    console.error("Error al traer comentarios")
    return [] 
  }
}


// Borrar Comentario 🗑️
export const deleteComment = async (newsId, commentId) => {
  try {
    const docRef = doc(db, 'news', newsId, 'comments', commentId)
    await deleteDoc(docRef)
    return { success: true }
  } catch (e) { return { success: false } }
}

// Editar Comentario ✍️
export const updateComment = async (newsId, commentId, newContent) => {
  try {
    const docRef = doc(db, 'news', newsId, 'comments', commentId)
    await updateDoc(docRef, { 
      content: newContent,
      updatedAt: new Date().toISOString() 
    })
    return { success: true }
  } catch (e) { return { success: false } }
}
