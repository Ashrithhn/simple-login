import { useEffect, useState } from "react";
import { getCities } from "../services/api";
import type { City } from "../types/city";

export default function TrafficOverview() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container-md">Loading traffic data...</div>;
  if (error)
    return (
      <div className="container-md error-message">Error: {error}</div>
    );

  const sorted = [...cities].sort(
    (a, b) => b.traffic.congestionIndex - a.traffic.congestionIndex
  );

  return (
    <div className="container-md">
      <h1>Traffic & Commute Dashboard</h1>
      <p>
        Compare congestion, commute times, and public transport scores across
        cities at a glance.
      </p>

      <div style={{ marginTop: "1rem" }}>
        {sorted.map((city) => (
          <div
            key={city.id}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2.5fr) minmax(0, 3fr)",
              gap: "1rem",
              padding: "0.9rem 1rem",
              borderRadius: "10px",
              marginBottom: "0.8rem",
              background:
                "linear-gradient(90deg, #fee2e2, #f9fafb, #eff6ff)",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1rem",
                  marginBottom: "0.25rem",
                }}
              >
                {city.name}, {city.country}
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#4b5563" }}>
                {city.tagline}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TrafficBadge
                label="Congestion"
                value={city.traffic.congestionIndex}
                tone="danger"
              />
              <TrafficBadge
                label="Commute"
                value={`${city.traffic.avgCommuteMinutes}m`}
              />
              <TrafficBadge
                label="Transit"
                value={city.traffic.publicTransportScore}
                tone="success"
              />
              <TrafficBadge
                label="QoL"
                value={city.qualityOfLife.qualityOfLifeIndex}
                tone="success"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrafficBadge(props: {
  label: string;
  value: number | string;
  tone?: "danger" | "success";
}) {
  const danger =
    props.tone === "danger"
      ? {
          bg: "rgba(239,68,68,0.1)",
          border: "rgba(239,68,68,0.4)",
          color: "#b91c1c",
        }
      : null;
  const success =
    props.tone === "success"
      ? {
          bg: "rgba(16,185,129,0.08)",
          border: "rgba(16,185,129,0.4)",
          color: "#047857",
        }
      : null;

  const palette =
    danger ??
    success ?? {
      bg: "rgba(59,130,246,0.06)",
      border: "rgba(59,130,246,0.4)",
      color: "#1d4ed8",
    };

  return (
    <div
      style={{
        padding: "0.35rem 0.6rem",
        borderRadius: "999px",
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.bg,
        fontSize: "0.75rem",
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
        color: palette.color,
      }}
    >
      <span>{props.label}</span>
      <span style={{ fontWeight: 600 }}>{props.value}</span>
    </div>
  );
}

