import type { LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapScene({userInfo}:Record<string, any>) { 
    
    const [coord, setCoord] = useState<LatLngExpression>([0, 0]);
    const mapRef = useRef<any>(null);
    
    useEffect( () => {
        if ( "geolocation" in navigator ) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newCoord: LatLngExpression = [position.coords.latitude, position.coords.longitude];
                setCoord(newCoord);

                if (mapRef.current) {
                    mapRef.current.setView(newCoord, 17);
                }
            }, console.error, { enableHighAccuracy: true });
        }

    }, [])

    return ( 
        <div className="w-full h-screen relative">
            <div className="fixed bottom-0 md:absolute md:top-0 md:left-0 bg-white p-4 rounded-lg shadow-lg z-10 h-64 w-full md:w-64 md:h-screen">
                <p>menu</p>
            </div>
            <MapContainer center={coord as LatLngExpression}
            ref={mapRef}
            className="w-full h-full z-0"
            zoom={17} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coord as LatLngExpression}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
    
}