"use client";
import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api'

const availableCars = [
  { id: 1, name: "Luxury Sedan", price: 100, image: "/placeholder.svg?height=200&width=300", premium: false },
  { id: 2, name: "Sports Car", price: 150, image: "/placeholder.svg?height=200&width=300", premium: true },
  { id: 3, name: "SUV", price: 120, image: "/placeholder.svg?height=200&width=300", premium: false },
  { id: 4, name: "Electric Vehicle", price: 130, image: "/placeholder.svg?height=200&width=300", premium: true },
  { id: 5, name: "Convertible", price: 140, image: "/placeholder.svg?height=200&width=300", premium: true },
  { id: 6, name: "Compact Car", price: 80, image: "/placeholder.svg?height=200&width=300", premium: false },
]

export default function BookingPage() {
  const [showCars, setShowCars] = useState(false)
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [dropoffDate, setDropoffDate] = useState('')
  const [dropoffTime, setDropoffTime] = useState('')
  
  const [pickupLocation, setPickupLocation] = useState('')
  const [dropoffLocation, setDropoffLocation] = useState('')
  
  const [pickupCoords, setPickupCoords] = useState<google.maps.LatLng | null>(null)
  const [dropoffCoords, setDropoffCoords] = useState<google.maps.LatLng | null>(null)

  const handlePickupLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupLocation(e.target.value)
  }

  const handleDropoffLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropoffLocation(e.target.value)
  }

  const handlePickupPlaceSelect = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace()
    setPickupLocation(place.formatted_address || '')
    setPickupCoords(place.geometry?.location || null)
  }

  const handleDropoffPlaceSelect = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace()
    setDropoffLocation(place.formatted_address || '')
    setDropoffCoords(place.geometry?.location || null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowCars(true)
  }

  const containerStyle = {
    width: '100%',
    height: '400px'
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Lucky Car Booking</h1>
      
      <Card className="mb-8">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Autocomplete
                  onLoad={(autocomplete) => { 
                    const autocompleteService = autocomplete 
                    autocompleteService.addListener('place_changed', () => handlePickupPlaceSelect(autocompleteService))
                  }}
                >
                  <Input
                    id="pickup"
                    value={pickupLocation}
                    onChange={handlePickupLocationChange}
                    placeholder="Enter pickup location"
                    required
                  />
                </Autocomplete>
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="dropoff">Drop-off Location</Label>
                <Autocomplete
                  onLoad={(autocomplete) => { 
                    const autocompleteService = autocomplete 
                    autocompleteService.addListener('place_changed', () => handleDropoffPlaceSelect(autocompleteService))
                  }}
                >
                  <Input
                    id="dropoff"
                    value={dropoffLocation}
                    onChange={handleDropoffLocationChange}
                    placeholder="Enter drop-off location"
                    required
                  />
                </Autocomplete>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupDate">Pickup Date</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupTime">Pickup Time</Label>
                <Input
                  id="pickupTime"
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dropoffDate">Drop-off Date</Label>
                <Input
                  id="dropoffDate"
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoffTime">Drop-off Time</Label>
                <Input
                  id="dropoffTime"
                  type="time"
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">Search Available Cars</Button>
          </form>
        </CardContent>
      </Card>

      {showCars && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCars.map((car) => (
              <Card key={car.id} className={car.premium ? "border-2 border-yellow-500" : ""}>
                <CardContent className="p-4">
                  <Image
                    src={car.image}
                    alt={car.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  {car.premium && (
                    <span className="bg-yellow-500 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block">
                      Premium
                    </span>
                  )}
                  <p className="text-lg font-bold">${car.price} per day</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Book Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Map</h2>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={pickupCoords ? { lat: pickupCoords.lat(), lng: pickupCoords.lng() } : { lat: 40.748817, lng: -73.985428 }} 
              zoom={12}
            >
              {pickupCoords && <Marker position={pickupCoords} />}
              {dropoffCoords && <Marker position={dropoffCoords} />}
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  )
}
