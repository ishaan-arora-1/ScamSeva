"use client"

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

export default function MapComponent({ location }) {
  return (
    <MapContainer 
      center={location} 
      zoom={13} 
      className="h-96 rounded-lg"
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={location}>
        <Popup>Your Current Location</Popup>
      </Marker>
    </MapContainer>
  )
}