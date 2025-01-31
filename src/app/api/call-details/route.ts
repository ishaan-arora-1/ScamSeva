import { NextRequest, NextResponse } from 'next/server'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, updateDoc, Timestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBznFtWcr92rQxHeRt7Ruci7jhvR9pAmHQ",
  authDomain: "devhaven-b41ac.firebaseapp.com",
  projectId: "devhaven-b41ac",
  storageBucket: "devhaven-b41ac.firebasestorage.app",
  messagingSenderId: "764792931875",
  appId: "1:764792931875:web:42253732f243eb9bead396",
  measurementId: "G-QF12PMZCP2"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function POST(req: NextRequest) {
  try {
    const { callId } = await req.json()
    const callRef = doc(db, 'calls', callId)

    await updateDoc(callRef, {
      status: 'completed',
      answered: true,
      timestamp: Timestamp.now()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error answering call:', error)
    return NextResponse.json({ error: 'Failed to answer call' }, { status: 500 })
  }
}