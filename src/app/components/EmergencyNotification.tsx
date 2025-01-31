"use client"
import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, query, where, orderBy, Timestamp, addDoc } from 'firebase/firestore'
import { Bell, AlertTriangle } from 'lucide-react'
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

export default function EmergencyNotification() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [hasUnread, setHasUnread] = useState(false)

  useEffect(() => {
    // Query for alerts in the last 24 hours
    const alertsQuery = query(
      collection(db, 'emergencyAlerts'),
      where('timestamp', '>=', Timestamp.fromDate(new Date(Date.now() - 86400000))),
      orderBy('timestamp', 'desc')
    )

    const unsubscribe = onSnapshot(alertsQuery, (snapshot) => {
      const newAlerts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      if (newAlerts.length > alerts.length) {
        setHasUnread(true)
        const audio = new Audio('/alert.mp3')
        audio.play()
      }
      
      setAlerts(newAlerts)
    })

    return () => unsubscribe()
  }, [])

  const clearNotifications = () => {
    setHasUnread(false)
  }

  return (
    <div className="fixed bottom-4 right-6 z-50">
      <button 
        onClick={clearNotifications}
        className="p-2 relative"
      >
        {hasUnread && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>
      
       <div className="mt-2 bg-red-50 border-red-200 animate-bounce">
          <div className="h-4 w-4 text-red-500" />
          <div>Emergency Alert!</div>
          <div className="font-bold text-red-600">
            Family member might be in danger.
          </div>
        </div>
    </div>
  )
}

