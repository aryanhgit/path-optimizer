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
    // const [currentCoords, setCurrentCoords] = useState(null);

    useEffect(() => {
        if (useCurrentOrigin || useCurrentDestination) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    // setCurrentCoords(`${longitude},${latitude}`);
                    if (useCurrentOrigin) setOriginCoords(`${longitude},${latitude}`);
                    if (useCurrentDestination) setDestCoords(`${longitude},${latitude}`);
                },
                (err) => {
                    // console.error("Geolocation error:", err);
                    alert("Failed to get current location.");
                }
            );
        }
    }, [useCurrentOrigin, useCurrentDestination]);

    const handleCompare = async () => {
        if (!originCoords || !destCoords) return;
        setLoading(true);
        const res = await fetch('/optimize/compare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                origin: originCoords,
                destination: destCoords,
                optimize_by: optimizeBy
            })
        });
        const data = await res.json();
        // console.log(data);
        setRoutes(data.alternatives || []);
        setSelectedRoute(null);
        setLoading(false);
    };

    // Assuming 'react-leaflet' components are imported
    // import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

    return (
        <div className="min-h-screen bg-slate-100 pt-24 pb-12">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Compare Travel Modes</h2>
                    <p className="text-slate-500 mt-2">Find the fastest or most eco-friendly path for your commute.</p>
                </div>

                {/* --- Input Form --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 border-b border-slate-200 pb-8">
                    {/* Origin Input */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-slate-700">
                            <input
                                type="checkbox"
                                checked={useCurrentOrigin}
                                onChange={(e) => setUseCurrentOrigin(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 mr-2"
                            />
                            Use Current Location as Origin
                        </label>
                        <Input label="Origin" onSelect={setOriginCoords} disabled={useCurrentOrigin} value={originCoords} />
                    </div>

                    {/* Destination Input */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-slate-700">
                            <input
                                type="checkbox"
                                checked={useCurrentDestination}
                                onChange={(e) => setUseCurrentDestination(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 mr-2"
                            />
                            Use Current Location as Destination
                        </label>
                        <Input label="Destination" onSelect={setDestCoords} disabled={useCurrentDestination} value={destCoords} />
                    </div>
                </div>

                {/* --- Options & Action --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mt-6">
                    <div className="md:col-span-1">
                        <label htmlFor="optimizeBy" className="block text-sm font-medium text-slate-700 mb-1">Optimize By</label>
                        <select
                            id="optimizeBy"
                            value={optimizeBy}
                            onChange={(e) => setOptimizeBy(e.target.value)}
                            className="block w-full border border-slate-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        >
                            <option value="time">Fastest Time</option>
                            <option value="cost">Eco-Friendly</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            className="w-full bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:bg-slate-400 disabled:shadow-none disabled:transform-none"
                            onClick={handleCompare}
                            disabled={loading}
                        >
                            {loading ? 'Comparing...' : 'Compare Routes'}
                        </button>
                    </div>
                </div>

                {/* --- Results Section --- */}
                {routes && (
                    <div className="mt-8 pt-8 border-t border-slate-200">
                        <ComparisonTable routes={routes} onSelectRoute={setSelectedRoute} />
                    </div>
                )}

                {selectedRoute && selectedRoute.route_geometry && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">Map View: {selectedRoute.mode}</h3>
                        <div className="rounded-lg shadow-lg overflow-hidden border border-slate-200">
                            <MapContainer
                                center={selectedRoute.route_geometry[Math.floor(selectedRoute.route_geometry.length / 2)]}
                                zoom={13}
                                style={{ height: "450px", width: "100%" }}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Polyline
                                    positions={selectedRoute.route_geometry}
                                    color="#0d9488" // Teal-600
                                    weight={5}
                                />
                            </MapContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RouteForm;
