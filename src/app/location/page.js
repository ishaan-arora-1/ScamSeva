"use client"

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { div } from 'motion/react-client'

const MapComponent = dynamic(
  () => import('@/app/components/MapComponent'), 
  { ssr: false }
)

const contacts = [
  { id: 1, name: 'Alice Johnson', phone: '555-1234' },
  { id: 2, name: 'Bob Smith', phone: '555-5678' },
  { id: 3, name: 'Charlie Brown', phone: '555-9012' },
  { id: 4, name: 'Diana Prince', phone: '555-3456' }
]

export default function LocationSharePage() {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [locationShared, setLocationShared] = useState(false)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude, 
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Location error:", error)
        }
      )
    }
  }, [])

  const handleShareLocation = () => {
    if (selectedContact && currentLocation) {
      setLocationShared(true)
      alert(`Location shared with ${selectedContact.name}`)
    } else {
      alert('Please select a contact and ensure location is available')
    }
  }

  return (
    <div className='bg-black h-screen w-screen'>

    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Share Location</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Select Contact</h2>
          <div className="space-y-2">
            {contacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-3 border rounded cursor-pointer ${
                  selectedContact?.id === contact.id 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-500">{contact.phone}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {currentLocation && <MapComponent location={currentLocation} />}

          <button 
            onClick={handleShareLocation}
            disabled={!selectedContact || !currentLocation}
            className={`w-full py-3 rounded-lg text-white font-bold ${
              selectedContact && currentLocation
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Share Location
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}