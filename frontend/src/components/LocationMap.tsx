"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationMapProps {
  lat: number;
  lng: number;
  onLocationChange: (lat: number, lng: number) => void;
}

export default function LocationMap({
  lat,
  lng,
  onLocationChange,
}: LocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If map is not initialized yet
    if (!mapRef.current) {
      // Initialize map
      mapRef.current = L.map("map").setView([lat, lng], 13);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Create marker and make it draggable
      markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(
        mapRef.current
      );
      markerRef.current.on("dragend", () => {
        const newPos = markerRef.current?.getLatLng();
        if (newPos) {
          onLocationChange(newPos.lat, newPos.lng);
        }
      });
    } else {
      // Update map view and marker position when lat/lng changes
      mapRef.current.setView([lat, lng]);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      }
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // This will completely remove the map
        mapRef.current = null; // Clear the map reference
        markerRef.current = null; // Clear the marker reference
      }
    };
  }, [lat, lng, onLocationChange]); // Dependency array ensures map is updated when lat/lng change

  return <div id="map" style={{ height: "300px", width: "100%" }} />;
}
