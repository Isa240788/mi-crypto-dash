import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { config } from 'dotenv'
import { resolve } from 'path'
import process from 'process'

config({ path: resolve(process.cwd(), '.env') })

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// 1. Extraemos la llave de Unsplash desde tu .env 🔑
const UNSPLASH_KEY = process.env.VITE_UNSPLASH_KEY

// 2. Creamos una función "limpia" para armar los links usando tu Key
const getImageUrl = (photoId) => {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80&client_id=${UNSPLASH_KEY}`
}


const noticias = [
  {
    title: 'Cobre repunta ante proyecciones de demanda en Asia',
    summary: 'El metal rojo muestra señales de recuperación tras nuevos incentivos en China.',
    content: '<p>El superávit comercial ha crecido un 15% gracias al rally del cobre. Analistas sugieren que la infraestructura para IA está demandando más cableado.</p>',
    category: 'Economía',
    // 📸 Foto de lingotes/minería de cobre
    imageUrl: 'https://images.unsplash.com/photo-1609387433510-d2ca76dd0259?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    author: 'Isidora S.',
    publishedAt: new Date().toISOString(),
    views: 0
  },
  {
    title: 'NVIDIA presenta Blackwell: La nueva era industrial',
    summary: 'La empresa lanza su arquitectura más potente, disparando sus acciones un 4%.',
    content: '<p>Blackwell es el motor que impulsará esta nueva revolución industrial. Las acciones alcanzaron nuevos máximos históricos.</p>',
    category: 'Tecnología',
    // 📸 Foto de chips y tecnología neón
    imageUrl: getImageUrl('1518770660439-4636190af475'),
    author: 'Isidora S.',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    views: 0
  },
  {
    title: 'Estrategia Nacional del Litio: Acuerdo clave en Atacama',
    summary: 'Se definen las bases de la alianza público-privada para la explotación del oro blanco.',
    content: '<p>Codelco y SQM han formalizado los términos para la explotación conjunta. Este acuerdo asegura que el Estado reciba la mayoría de las utilidades.</p>',
    category: 'Empresas',
    // 📸 Foto de salares/paisaje minero
    imageUrl: getImageUrl('1469474968028-56623f02e42e'),
    author: 'Isidora S.',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    views: 0
  }
]


async function run() {
  const col = collection(db, 'news')
  for (const n of noticias) {
    try {
      await addDoc(col, n)
      console.log('Cargado')
    } catch (e) {
      console.error('Error')
    }
  }
  process.exit(0)
}

run()
