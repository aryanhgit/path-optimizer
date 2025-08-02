// RouteForm.js
import { useState, useEffect } from "react";
import Input from "./Input";
import ComparisonTable from "./ComparisonTable";
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function RouteForm() {
    const [originCoords, setOriginCoords] = useState('');
    const [destCoords, setDestCoords] = useState('');
    const [optimizeBy, setOptimizeBy] = useState('time');
    const [routes, setRoutes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const [useCurrentOrigin, setUseCurrentOrigin] = useState(false);
    const [useCurrentDestination, setUseCurrentDestination] = useState(false);
    const [currentCoords, setCurrentCoords] = useState(null);

    useEffect(() => {
        if (useCurrentOrigin || useCurrentDestination) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setCurrentCoords(`${longitude},${latitude}`);
                    if (useCurrentOrigin) setOriginCoords(`${longitude},${latitude}`);
                    if (useCurrentDestination) setDestCoords(`${longitude},${latitude}`);
                },
                (err) => {
                    console.error("Geolocation error:", err);
                    alert("Failed to get current location.");
                }
            );
        }
    }, [useCurrentOrigin, useCurrentDestination]);

    const handleCompare = async () => {
        if (!originCoords || !destCoords) return;
        setLoading(true);
        const res = await fetch('http://localhost:5000/optimize/compare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                origin: originCoords,
                destination: destCoords,
                optimize_by: optimizeBy
            })
        });
        const data = await res.json();
        console.log(data);
        setRoutes(data.alternatives || []);
        setSelectedRoute(null);
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Compare Travel Modes</h2>

            <div className="mb-4">
                <label className="flex items-center mb-1">
                    <input type="checkbox" checked={useCurrentOrigin} onChange={(e) => setUseCurrentOrigin(e.target.checked)} className="mr-2" />
                    Use Current Location as Origin
                </label>
                <Input label="Origin" onSelect={setOriginCoords} disabled={useCurrentOrigin} value={originCoords} />
            </div>

            <div className="mb-4">
                <label className="flex items-center mb-1">
                    <input type="checkbox" checked={useCurrentDestination} onChange={(e) => setUseCurrentDestination(e.target.checked)} className="mr-2" />
                    Use Current Location as Destination
                </label>
                <Input label="Destination" onSelect={setDestCoords} disabled={useCurrentDestination} value={destCoords} />
            </div>

            <div className="my-4">
                <label className="block font-medium mb-1">Optimize By</label>
                <select
                    value={optimizeBy}
                    onChange={(e) => setOptimizeBy(e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="time">Time</option>
                    <option value="cost">Eco-Friendly</option>
                </select>
            </div>

            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleCompare}
                disabled={loading}
            >
                {loading ? 'Comparing...' : 'Compare Travel Modes'}
            </button>

            {routes && <ComparisonTable routes={routes} onSelectRoute={setSelectedRoute} />}

            {selectedRoute && selectedRoute.route_geometry && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Map View: {selectedRoute.mode}</h3>
                    <MapContainer
                        center={selectedRoute.route_geometry[0]}
                        zoom={13}
                        style={{ height: "400px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <Polyline
                            positions={selectedRoute.route_geometry}
                            color="blue"
                        />
                    </MapContainer>
                </div>
            )}
        </div>
    );
}

export default RouteForm;
