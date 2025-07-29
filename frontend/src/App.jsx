import { useState } from 'react';
import axios from 'axios';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/optimize', { origin, destination });
    setResult(res.data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Bus Route Optimizer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button type="submit">Get Route</button>
      </form>

      {result && (
        <div>
          <h3>Result:</h3>
          <p>{result.route}</p>
          <p>Time: {result.estimated_time}</p>
          <p>CO₂ Saved: {result.carbon_saving_kg} kg</p>
        </div>
      )}
    </div>
  );
}

export default App;
