// Viability Law v1.0 — DO NOT MODIFY WITHOUT VERSION BUMP

import { NextResponse } from "next/server";

// ⬅️ IMPORTANT: Correct relative path for App Router
// This file is located at: src/app/api/simulate/route.ts
// So the correct relative path is:
import { runSimulation } from "../../../shared/simulation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = runSimulation({
      alpha: body.alpha ?? 1.1,
      entropyFloor: body.entropyFloor ?? 0.5,
      noiseLevel: body.noiseLevel ?? 0.05,
      horizon: body.horizon ?? 100,
      seed: body.seed ?? 42,
    });

    return NextResponse.json(result);

  } catch (err) {
    console.error("API /simulate error:", err);
    return NextResponse.json(
      { error: "Simulation failed", details: String(err) },
      { status: 500 }
    );
  }
}
