// ComparisonTable.js
function ComparisonTable({ routes, onSelectRoute }) {
    if (!routes || routes.length === 0) {
        return <p className="mt-4 text-red-600">No routes found.</p>;
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Comparison Results</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="border px-4 py-2">Mode</th>
                            <th className="border px-4 py-2">Distance (km)</th>
                            <th className="border px-4 py-2">Time (min)</th>
                            <th className="border px-4 py-2">Emissions (kg)</th>
                            <th className="border px-4 py-2">Fuel Cost ₹</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map((route, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{route.mode}</td>
                                <td className="border px-4 py-2">{route.distance_km}</td>
                                <td className="border px-4 py-2">{route.duration_min}</td>
                                <td className="border px-4 py-2">{route.carbon_emissions_kg}</td>
                                <td className="border px-4 py-2">{route.fuel_cost_rs}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => onSelectRoute(route)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                    >
                                        View Map
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ComparisonTable;
