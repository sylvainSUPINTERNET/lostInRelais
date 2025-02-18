import type { LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LuPackage, LuMapPin, LuSearch  } from "react-icons/lu";
import "./MapScene.css";

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
            <div className="overflow-auto fixed bottom-0 md:absolute md:top-0 md:left-0 bg-white p-4 shadow-lg z-10 h-64 w-full md:w-96 md:h-screen">
                <div className="flex items-center gap-2 p-2">
                    <LuPackage fontSize={24} color={"#C7745E"} className="mt-1"/>
                    <p className="text-gray-700 text-2xl">Point Relais</p>
                </div>
                <div className="p-2 mt-2 items-center flex gap-2">
                    <LuMapPin fontSize={18} color={"gray"}/>
                    <p className="text-gray-700 font-semibold">A quelle adresse collecter le colis ?</p>
                </div>
                <div className="ml-4 p-2 mt-2">
                        <form>
                            <p className="mb-[0.5rem]">
                                Chercher une adresse<span className="text-red-700 font-bold">*</span>
                            </p>
                            {/* <label htmlFor="search" className="absolute inset-y-0 left-0 flex items-center pl-3">
                            </label> */}
                            <div className="relative w-full max-w-sm">
                                <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                                    <LuSearch fontSize={18} color="gray"/>
                                </div>
                                <input type="search" placeholder="Rechercher..."
                                    className="outline-none border w-full px-10 py-2 rounded-md focus:outline-none 
                                    border-gray-100 focus:border-gray-100 focus:ring ring-gray-100 transition-all
                                    " />
                            </div>
                            
                        </form>
                </div>

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