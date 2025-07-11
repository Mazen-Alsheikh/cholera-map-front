import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import States from "./States";

function ColeraMap({ onStateSelect }) {
    
    return ( 
        <MapContainer 
            className="colera-map" 
            center={[15.5006544, 32.55989940]}
            zoom={5}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"/>
            <States onStateSelect={onStateSelect} />
        </MapContainer>
    )
}

export default ColeraMap;