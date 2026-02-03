/**
 * Single city detail page. Fetches city by ID from URL.
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCityById } from "../services/api";
import type { City } from "../types/city";
import cityImage from "../assets/city.jpg";

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

  if (loading) return <div className="container-md">Loading city...</div>;
  if (error)
    return (
      <div className="container-md error-message">Error: {error}</div>
    );
  if (!city) return <div className="container-md">City not found.</div>;

  return (
    <div className="container-md">
      <Link
        to="/cities"
        style={{ marginBottom: "1rem", display: "inline-block" }}
      >
        ← Back to cities
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
          gap: "1.5rem",
        }}
      >
        <section>
          <h1 style={{ marginBottom: "0.4rem" }}>
            {city.name}, {city.country}
          </h1>
          <p
            style={{
              marginBottom: "0.8rem",
              color: "#6b7280",
            }}
          >
            {city.tagline}
          </p>

          <p style={{ marginBottom: "0.25rem" }}>
            <strong>Population:</strong>{" "}
            {city.population.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
          <p style={{ marginBottom: "0.25rem" }}>
            <strong>Region:</strong> {city.region} &middot;{" "}
            <strong>Timezone:</strong> {city.timezone}
          </p>
          <p style={{ marginBottom: "0.25rem" }}>
            <strong>Area:</strong> {city.areaKm2.toLocaleString()} km² &middot;{" "}
            <strong>Density:</strong>{" "}
            {city.densityPerKm2.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{" "}
            people/km²
          </p>

          <p style={{ marginTop: "1rem" }}>{city.description}</p>

          <h2 style={{ marginTop: "1.5rem" }}>Landmarks</h2>
          <ul>
            {city.landmarks.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>

          <h2 style={{ marginTop: "1.5rem" }}>Climate</h2>
          <p>
            {city.climate.type} &mdash; average highs around{" "}
            {city.climate.avgHighC}°C and lows around {city.climate.avgLowC}°C.
          </p>
        </section>

        <aside>
          <div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "1rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={cityImage}
              alt={city.name}
              style={{ width: "100%", height: "220px", objectFit: "cover" }}
            />
          </div>

          <section
            style={{
              padding: "0.9rem 1rem",
              borderRadius: "10px",
              background:
                "radial-gradient(circle at top left, #eff6ff, #f9fafb)",
              marginBottom: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1rem", marginBottom: "0.7rem" }}>
              Traffic & Mobility
            </h2>
            <MetricRow
              label="Traffic congestion"
              value={`${city.traffic.congestionIndex}/100`}
            />
            <MetricRow
              label="Avg. commute time"
              value={`${city.traffic.avgCommuteMinutes} min`}
            />
            <MetricRow
              label="Public transport"
              value={`${city.traffic.publicTransportScore}/100`}
            />
          </section>

          <section
            style={{
              padding: "0.9rem 1rem",
              borderRadius: "10px",
              background:
                "radial-gradient(circle at top left, #ecfdf5, #f9fafb)",
            }}
          >
            <h2 style={{ fontSize: "1rem", marginBottom: "0.7rem" }}>
              Quality of Life
            </h2>
            <MetricRow
              label="Safety index"
              value={`${city.qualityOfLife.safetyIndex}/100`}
            />
            <MetricRow
              label="Overall quality of life"
              value={`${city.qualityOfLife.qualityOfLifeIndex}/100`}
            />
          </section>
        </aside>
      </div>
    </div>
  );
}

function MetricRow(props: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.85rem",
        marginBottom: "0.35rem",
      }}
    >
      <span style={{ color: "#4b5563" }}>{props.label}</span>
      <span style={{ fontWeight: 600 }}>{props.value}</span>
    </div>
  );
}
