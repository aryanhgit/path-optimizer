import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function RouteMap({ route }) {
    if (!route || !route.route_geometry || route.route_geometry.length === 0) return null;

    const path = route.route_geometry;
    const start = path[0];
    const end = path[path.length - 1];

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Map View</h3>
            <MapContainer
                center={start}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline positions={path} color="blue" />
                <Marker position={start}><Popup>Start</Popup></Marker>
                <Marker position={end}><Popup>End</Popup></Marker>
            </MapContainer>
        </div>
    );
}

export default RouteMap;
