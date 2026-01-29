/**
 * Single city detail page. Fetches city by ID from URL.
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCityById } from '../services/api';
import type { City } from '../types/city';

export default function CityDetail() {
  const { id } = useParams<{ id: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getCityById(id)
      .then(setCity)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container-md">Loading...</div>;
  if (error) return <div className="container-md error-message">Error: {error}</div>;
  if (!city) return <div className="container-md">City not found.</div>;

  return (
    <div className="container-md">
      <Link to="/cities" style={{ marginBottom: '1rem', display: 'block' }}>
        ← Back to cities
      </Link>
      <h1>{city.name}, {city.country}</h1>
      <p><strong>Population:</strong> {city.population.toLocaleString()}</p>
      <p>{city.description}</p>
      <h2>Landmarks</h2>
      <ul>
        {city.landmarks.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}
