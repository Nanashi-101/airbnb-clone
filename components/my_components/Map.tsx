"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "@/app/lib/getCountries";
import { icon } from "leaflet";
import mapIcon from "@/public/assets/map-icon.png";
import { Dispatch, SetStateAction } from "react";

const ICON = icon({
  iconUrl: mapIcon.src,
  iconSize: [25, 40],
});

interface MapComponentProps {
  locationValue: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

const MapComponent = ({
  locationValue,
  setLocation,
}: MapComponentProps) => {
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(locationValue)?.latLang;
  setLocation(getCountryByValue(locationValue)?.label as string)

  return (
    <MapContainer
      scrollWheelZoom={true}
      className="h-[50vh] rounded-lg relative z-0"
      center={location ?? [51.505, -0.09]}
      zoom={6}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={location ?? [51.505, -0.09]}
        icon={ICON}
        draggable={true}
      />
    </MapContainer>
  );
};

export default MapComponent;
