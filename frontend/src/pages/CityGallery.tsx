import { useEffect, useState } from "react";
import { getCities } from "../services/api";
import type { City } from "../types/city";
import cityImage from "../assets/city.jpg";

export default function CityGallery() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container-md">Loading gallery...</div>;
  if (error)
    return (
      <div className="container-md error-message">Error: {error}</div>
    );

  return (
    <div className="container-md">
      <h1>City Gallery</h1>
      <p>
        A visual wall of cities around the world. Hover to see quick stats,
        click a card from the main catalog for deeper insights.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {cities.map((city) => (
          <figure
            key={city.id}
            style={{
              margin: 0,
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            }}
          >
            <img
              src={cityImage}
              alt={city.name}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <figcaption
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "0.6rem 0.7rem",
                fontSize: "0.8rem",
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {city.name}, {city.country}
              </div>
              <div style={{ opacity: 0.9, fontSize: "0.75rem" }}>
                Pop. {city.population.toLocaleString()}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

