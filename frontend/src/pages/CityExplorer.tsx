import { useEffect, useMemo, useState } from "react";
import { getCities } from "../services/api";
import type { City } from "../types/city";

export default function CityExplorer() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [minPopulation, setMinPopulation] = useState(3_000_000);
  const [maxCommute, setMaxCommute] = useState(60);
  const [minQualityOfLife, setMinQualityOfLife] = useState(80);

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const matches = useMemo(
    () =>
      cities.filter((c) => {
        const populationOk = c.population >= minPopulation;
        const commuteOk = c.traffic.avgCommuteMinutes <= maxCommute;
        const qolOk =
          c.qualityOfLife.qualityOfLifeIndex >= minQualityOfLife;
        return populationOk && commuteOk && qolOk;
      }),
    [cities, maxCommute, minPopulation, minQualityOfLife]
  );

  if (loading) return <div className="container-md">Loading explorer...</div>;
  if (error)
    return (
      <div className="container-md error-message">Error: {error}</div>
    );

  return (
    <div className="container-md">
      <h1>City Explorer</h1>
      <p>
        Tune the sliders to discover cities that match your population,
        commute, and quality‑of‑life preferences.
      </p>

      <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
        <SliderRow
          label="Minimum population"
          value={minPopulation}
          displayValue={minPopulation.toLocaleString()}
          min={1_000_000}
          max={40_000_000}
          step={500_000}
          onChange={setMinPopulation}
        />
        <SliderRow
          label="Max average commute (minutes)"
          value={maxCommute}
          displayValue={`${maxCommute} min`}
          min={20}
          max={90}
          step={5}
          onChange={setMaxCommute}
        />
        <SliderRow
          label="Minimum quality‑of‑life index"
          value={minQualityOfLife}
          displayValue={`${minQualityOfLife}/100`}
          min={60}
          max={100}
          step={1}
          onChange={setMinQualityOfLife}
        />
      </div>

      {matches.length === 0 ? (
        <p>No cities match the current criteria yet. Try relaxing a slider.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Region</Th>
              <Th>Population</Th>
              <Th>Commute</Th>
              <Th>Traffic</Th>
              <Th>QoL</Th>
            </tr>
          </thead>
          <tbody>
            {matches.map((city) => (
              <tr key={city.id}>
                <Td>
                  {city.name}, {city.country}
                </Td>
                <Td>{city.region}</Td>
                <Td>{city.population.toLocaleString()}</Td>
                <Td>{city.traffic.avgCommuteMinutes} min</Td>
                <Td>{city.traffic.congestionIndex}/100</Td>
                <Td>{city.qualityOfLife.qualityOfLifeIndex}/100</Td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function SliderRow(props: {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.25rem",
          fontSize: "0.9rem",
        }}
      >
        <span>{props.label}</span>
        <span style={{ fontWeight: 600 }}>{props.displayValue}</span>
      </div>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "0.6rem 0.4rem",
        borderBottom: "1px solid #e5e7eb",
        fontSize: "0.85rem",
        color: "#4b5563",
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: "0.5rem 0.4rem",
        borderBottom: "1px solid #f3f4f6",
        fontSize: "0.85rem",
      }}
    >
      {children}
    </td>
  );
}

