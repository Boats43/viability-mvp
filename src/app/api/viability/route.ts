import { NextResponse } from "next/server";
import { runSimulation } from "../../../shared/simulation";

type ViabilityRequest = {
  alpha: number;
  entropyFloor: number;
  noiseLevel: number;
  horizon: number;
  seed?: number;
  assessment?: {
    safety: boolean;
    cost: boolean;
    goal: boolean;
    notes?: string;
  };
};

export async function POST(req: Request) {
  try {
    const body: ViabilityRequest = await req.json();

    const result = runSimulation({
      alpha: body.alpha,
      entropyFloor: body.entropyFloor,
      noiseLevel: body.noiseLevel,
      horizon: body.horizon,
      seed: body.seed ?? 42,
    });

    const assessment =
      body.assessment &&
      typeof body.assessment.safety === "boolean" &&
      typeof body.assessment.cost === "boolean" &&
      typeof body.assessment.goal === "boolean"
        ? body.assessment
        : null;

    const decision:
      | "NON_VIABLE"
      | "VIABLE_BUT_BLOCKED"
      | "VIABLE_AND_ACCEPTABLE" =
      result.viable === false
        ? "NON_VIABLE"
        : assessment &&
          (assessment.safety === false ||
            assessment.cost === false ||
            assessment.goal === false)
        ? "VIABLE_BUT_BLOCKED"
        : "VIABLE_AND_ACCEPTABLE";

    return NextResponse.json({
      ...result,
      assessment,
      decision,
    });
  } catch (err) {
    console.error("API /viability error:", err);
    return NextResponse.json(
      { error: "Simulation failed", details: String(err) },
      { status: 500 }
    );
  }
}
