/**
 * Lists all cities with links to detail pages.
 */

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCities } from "../services/api";
import type { City } from "../types/city";
import cityImage from "../assets/city.jpg";

export default function CityList() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const regions = useMemo(
    () =>
      Array.from(
        new Set(
          cities
            .map((c) => c.region)
            .filter((r) => r && r.trim().length > 0)
        )
      ).sort(),
    [cities]
  );

  const filtered = useMemo(
    () =>
      cities.filter((city) => {
        const matchesRegion =
          regionFilter === "all" || city.region === regionFilter;
        const q = search.trim().toLowerCase();
        if (!q) return matchesRegion;
        const haystack = [
          city.name,
          city.country,
          city.region,
          city.tagline,
          ...city.keywords,
          ...city.landmarks,
        ]
          .join(" ")
          .toLowerCase();
        return matchesRegion && haystack.includes(q);
      }),
    [cities, regionFilter, search]
  );

  if (loading) return <div className="container-md">Loading cities...</div>;
  if (error)
    return (
      <div className="container-md error-message">Error: {error}</div>
    );

  return (
    <div className="container-md city-page">
      <h1>City Catalog</h1>
      <p>
        Browse major cities with traffic, quality‑of‑life, and climate
        highlights. Use search and filters to quickly find what you need.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, country, landmark, keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 220px" }}
        />
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          style={{ minWidth: "180px", padding: "0.5rem" }}
        >
          <option value="all">All regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No cities match your filters yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {filtered.map((city) => (
            <Link
              key={city.id}
              to={`/cities/${city.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <article
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100%",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={cityImage}
                    alt={city.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "1rem 1.1rem 1.2rem" }}>
                  <h2 style={{ marginBottom: "0.25rem", fontSize: "1.1rem" }}>
                    {city.name}, {city.country}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#6b7280",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {city.tagline}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      color: "#4b5563",
                    }}
                  >
                    <span>
                      Pop.{" "}
                      {city.population.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                    <span>Traffic: {city.traffic.congestionIndex}/100</span>
                    <span>QoL: {city.qualityOfLife.qualityOfLifeIndex}/100</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
