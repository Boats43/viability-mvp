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
import { runSimulation } from "../shared/simulation";
import { ViabilityResult } from "../types/viability";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

export default function Page() {
  const [mode, setMode] = useState<'local' | 'api'>('local');
  const [alpha, setAlpha] = useState(1.15);
  const [entropyFloor, setEntropyFloor] = useState(0.6);
  const [noiseLevel, setNoiseLevel] = useState(0.03);
  const [result, setResult] = useState<ViabilityResult | null>(null);
  const [status, setStatus] = useState<'stable' | 'fragile' | 'chaotic' | null>(null);

  const classifyStatus = (res: ViabilityResult) => {
    if (!res.viable) return 'chaotic';
    const volatility = res.entropy.reduce((acc, v, i, arr) => {
      if (i === 0) return acc;
      return acc + Math.abs(v - arr[i - 1]);
    }, 0);
    return volatility < 5 ? 'stable' : 'fragile';
  };

  const run = async () => {
    try {
      const res = mode === 'local'
        ? runSimulation({ alpha, entropyFloor, noiseLevel, horizon: 120, seed: 42 })
        : await fetch('/api/viability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ alpha, entropyFloor, noiseLevel, horizon: 120, seed: 42 }),
          }).then(r => r.json());

      setResult(res);
      setStatus(classifyStatus(res));
    } catch (err) {
      console.error('API error, falling back to local:', err);
      setMode('local');
    }
  };

  useEffect(() => {
    run();
  }, [alpha, entropyFloor, noiseLevel, mode]);

  const presets = {
    stable: { alpha: 1.3, entropyFloor: 0.7, noiseLevel: 0.01 },
    fragile: { alpha: 1.5, entropyFloor: 0.5, noiseLevel: 0.01 },
    chaotic: { alpha: 1.1, entropyFloor: 0.4, noiseLevel: 0.1 },
    nearCollapse: { alpha: 1.0, entropyFloor: 0.3, noiseLevel: 0.15 },
    randomized: {
      alpha: +(Math.random() * 1.5 + 0.5).toFixed(2),
      entropyFloor: +(Math.random() * 2.5 + 0.1).toFixed(2),
      noiseLevel: +(Math.random() * 0.2).toFixed(3),
    },
  };

  const chartData = result
    ? {
        labels: result.time,
        datasets: [
          { label: 'Divergence (D)', data: result.divergence, borderColor: 'red' },
          { label: 'Correction (C)', data: result.correction, borderColor: 'green' },
          { label: 'Entropy (H)', data: result.entropy, borderColor: 'blue' },
        ],
      }
    : null;

  const exportJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'viability-result.json';
    a.click();
  };

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Viability Law — Dynamic MVP</h1>
      <p className="text-gray-400">
        This simulator shows the boundary between <strong>persistence</strong> and <strong>collapse</strong> for adaptive systems.
        A system remains viable only if <em>correction exceeds divergence</em> and <em>internal variety (entropy)</em> stays above a minimum threshold.
      </p>

      {chartData && (
        <div className="bg-white p-4 rounded-xl shadow">
          <Line data={chartData} />
        </div>
      )}

      <div className="flex flex-wrap gap-4 text-sm">
        <label><input type="radio" checked={mode === 'local'} onChange={() => setMode('local')} /> <span className="ml-1">Run Locally</span></label>
        <label><input type="radio" checked={mode === 'api'} onChange={() => setMode('api')} /> <span className="ml-1">Run via API</span></label>
        {Object.keys(presets).map((key) => (
          <button
            key={key}
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
            title={`Preset: ${key}`}
            onClick={() => {
              const p = presets[key as keyof typeof presets];
              setAlpha(p.alpha);
              setEntropyFloor(p.entropyFloor);
              setNoiseLevel(p.noiseLevel);
            }}>
            Preset: {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
        <button onClick={exportJSON} className="px-3 py-1 rounded bg-blue-600 text-white ml-auto">Export JSON</button>
      </div>

      <div className="space-y-4 bg-white p-4 rounded-xl shadow">
        <div>
          <label className="block font-semibold" title="Higher alpha = stronger corrections">Correction Strength (alpha): {alpha.toFixed(2)}</label>
          <input type="range" min="0.5" max="2.0" step="0.01" value={alpha} onChange={(e) => setAlpha(+e.target.value)} className="w-full" />
        </div>
        <div>
          <label className="block font-semibold" title="Minimum required entropy for survival">Entropy Floor (Hₘᵢₙ): {entropyFloor.toFixed(2)}</label>
          <input type="range" min="0.1" max="3.0" step="0.01" value={entropyFloor} onChange={(e) => setEntropyFloor(+e.target.value)} className="w-full" />
        </div>
        <div>
          <label className="block font-semibold" title="Noise level affects unpredictability">Noise Level: {noiseLevel.toFixed(3)}</label>
          <input type="range" min="0" max="0.2" step="0.001" value={noiseLevel} onChange={(e) => setNoiseLevel(+e.target.value)} className="w-full" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow text-lg">
        <strong>Final Status:</strong>{' '}
        {result ? (result.viable ? '✅ Persistent (Viable)' : '❌ Collapse Detected') : 'Running...'}
      </div>

      <div className="flex space-x-4 text-sm">
        <span className={`px-2 py-1 rounded-full text-white ${
          status === 'stable' ? 'bg-green-600' :
          status === 'fragile' ? 'bg-yellow-500' :
          'bg-red-600'
        }`}>
          {status === 'stable' ? 'Stable' : status === 'fragile' ? 'Fragile' : 'Chaotic'}
        </span>
      </div>

      {result && (
        <div className="text-sm text-gray-600">
          <p><strong>Entropy Range:</strong> {Math.min(...result.entropy).toFixed(2)} → {Math.max(...result.entropy).toFixed(2)}</p>
          <p><strong>Time Steps:</strong> {result.time.length}</p>
        </div>
      )}

      {result && !result.viable && (
        <div className="bg-red-100 p-4 rounded-xl text-red-800 shadow">
          <strong>Collapse Explanation</strong>
          <div>Time: {result.timeToCollapse}</div>
          <div>Reason: {result.failureReason}</div>
          <div>{result.summary}</div>
        </div>
      )}
    </main>
  );
}
