'use client';

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export default function ViabilityMVP() {
  const [alpha, setAlpha] = useState(1.15);
  const [entropyFloor, setEntropyFloor] = useState(0.6);
  const [noiseLevel, setNoiseLevel] = useState(0.03);

  const [data, setData] = useState({
    divergence: [] as number[],
    correction: [] as number[],
    entropy: [] as number[],
    viability: [] as boolean[],
    time: [] as number[],
  });

  useEffect(() => {
    const T = 120;
    const n = 10;

    let Q = Array.from({ length: n }, () => Math.random());
    normalize(Q);

    const entropy: number[] = [];
    const divergence: number[] = [];
    const correction: number[] = [];
    const viability: boolean[] = [];
    const time: number[] = [];

    for (let t = 0; t < T; t++) {
      const P = Array.from({ length: n }, () => Math.random() + 0.3);
      normalize(P);

      const H = -Q.reduce((acc, p) => acc + p * Math.log(p), 0);
      const D = Q.reduce((acc, q, i) => acc + q * Math.log(q / P[i]), 0);
      const C = alpha * D;

      const isViable = C > D && H > entropyFloor;

      entropy.push(H);
      divergence.push(D);
      correction.push(C);
      viability.push(isViable);
      time.push(t);

      if (!isViable) break;

      for (let i = 0; i < n; i++) {
        Q[i] = Q[i] - alpha * (Q[i] - P[i]);
      }

      for (let i = 0; i < n; i++) {
        Q[i] += noiseLevel * (Math.random() - 0.5);
        if (Q[i] < 0) Q[i] = 1e-6;
      }

      normalize(Q);
    }

    setData({ divergence, correction, entropy, viability, time });
  }, [alpha, entropyFloor, noiseLevel]);

  const chartData = {
    labels: data.time,
    datasets: [
      {
        label: "Divergence (D)",
        data: data.divergence,
        borderColor: "red",
      },
      {
        label: "Correction (C)",
        data: data.correction,
        borderColor: "green",
      },
      {
        label: "Entropy (H)",
        data: data.entropy,
        borderColor: "blue",
      },
    ],
  };

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Viability Law — Dynamic MVP</h1>

      <div className="bg-white p-4 rounded-xl shadow">
        <Line data={chartData} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <div>
          <label>Correction Strength (alpha): {alpha.toFixed(2)}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label>Entropy Floor (Hₘᵢₙ): {entropyFloor.toFixed(2)}</label>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.01"
            value={entropyFloor}
            onChange={(e) => setEntropyFloor(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label>Noise Level: {noiseLevel.toFixed(3)}</label>
          <input
            type="range"
            min="0.0"
            max="0.2"
            step="0.001"
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow text-lg">
        <strong>Final Status:</strong>{" "}
        {data.viability.length
          ? data.viability.at(-1)
            ? "✅ Persistent (Viable)"
            : "❌ Collapse (Failure Envelope)"
          : "Loading..."}
      </div>
    </div>
  );
}

function normalize(v: number[]) {
  const sum = v.reduce((a, b) => a + b, 0);
  for (let i = 0; i < v.length; i++) v[i] /= sum;
} 
