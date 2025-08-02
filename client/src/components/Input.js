// Input.js
import { useEffect, useState } from "react";

function Input({ label, onSelect, disabled = false, defaultValue = "" }) {
    const [value, setValue] = useState(defaultValue);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (value.length < 3 || disabled) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            const res = await fetch("http://localhost:5000/places/geocode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ place: value })
            });
            const data = await res.json();
            setSuggestions(data.result || []);
        };

        const timeout = setTimeout(fetchSuggestions, 300); // debounce
        return () => clearTimeout(timeout);
    }, [value, disabled]);

    const handleSelect = (place) => {
        setValue(place.name);
        setSuggestions([]);
        onSelect(`${place.longitude},${place.latitude}`);
    };

    return (
        <div className="relative mb-4">
            <label className="block font-medium mb-1">{label}</label>
            <input
                type="text"
                className={`border p-2 rounded w-full ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter ${label}`}
                disabled={disabled}
            />
            {!disabled && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-40 overflow-y-auto mt-1">
                    {suggestions.map((place, i) => (
                        <li
                            key={i}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => handleSelect(place)}
                        >
                            {place.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Input;
