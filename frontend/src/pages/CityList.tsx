/**
 * Lists all cities with links to detail pages.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCities } from '../services/api';
import type { City } from '../types/city';

export default function CityList() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container-md">Loading...</div>;
  if (error) return <div className="container-md error-message">Error: {error}</div>;

  return (
    <div className="container-md">
      <h1>Cities</h1>
      <ul>
        {cities.map((city) => (
          <li key={city.id} style={{ marginBottom: '0.5rem' }}>
            <Link to={`/cities/${city.id}`}>
              {city.name}, {city.country}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
