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

  const [collapseInfo, setCollapseInfo] = useState<{
    time: number;
    reason: string;
    interpretation: string;
  } | null>(null);

  // Scenario Presets
  const applyPreset = (type: 'stable' | 'fragile' | 'chaotic') => {
    if (type === 'stable') {
      setAlpha(1.5);
      setEntropyFloor(0.5);
      setNoiseLevel(0.01);
    } else if (type === 'fragile') {
      setAlpha(1.1);
      setEntropyFloor(1.2);
      setNoiseLevel(0.05);
    } else if (type === 'chaotic') {
      setAlpha(0.8);
      setEntropyFloor(1.5);
      setNoiseLevel(0.12);
    }
  };

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

    let failedAt = -1;
    let failReason = '';
    let interpretation = '';

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

      if (!isViable) {
        failedAt = t;
        if (C <= D) {
          failReason = `Correction capacity fell below divergence (C = ${C.toFixed(2)} ≤ D = ${D.toFixed(2)})`;
          interpretation = "System could not respond to environmental divergence.";
        } else if (H <= entropyFloor) {
          failReason = `Entropy fell below minimum (H = ${H.toFixed(2)} < ${entropyFloor})`;
          interpretation = "System lost adaptive variety faster than required for viability.";
        }
        break;
      }

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

    if (failedAt >= 0) {
      setCollapseInfo({
        time: failedAt,
        reason: failReason,
        interpretation,
      });
    } else {
      setCollapseInfo(null);
    }
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
      <p className="text-sm text-gray-300">
        This simulator shows the boundary between <strong>persistence</strong> and <strong>collapse</strong> for adaptive systems. A system remains viable only if <em>correction exceeds divergence</em> and <em>internal variety (entropy)</em> stays above a minimum threshold.
      </p>

      <h1 className="text-3xl font-bold">Viability Law — Dynamic MVP</h1>

      <div className="bg-white p-4 rounded-xl shadow">
        <Line data={chartData} />
      </div>

      {/* Preset Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => applyPreset("stable")}
          className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-xl font-semibold"
        >
          🟢 Stable
        </button>
        <button
          onClick={() => applyPreset("fragile")}
          className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-xl font-semibold"
        >
          🟡 Fragile
        </button>
        <button
          onClick={() => applyPreset("chaotic")}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl font-semibold"
        >
          🔴 Chaotic
        </button>
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

      {collapseInfo && (
        <div className="bg-red-100 p-4 rounded-xl shadow text-red-800 space-y-1 text-sm">
          <strong>Collapse Explanation</strong>
          <div>❌ Collapse at t = {collapseInfo.time}</div>
          <div><strong>Reason:</strong> {collapseInfo.reason}</div>
          <div><strong>Interpretation:</strong> {collapseInfo.interpretation}</div>
        </div>
      )}
    </div>
  );
}

function normalize(v: number[]) {
  const sum = v.reduce((a, b) => a + b, 0);
  for (let i = 0; i < v.length; i++) v[i] /= sum;
}
