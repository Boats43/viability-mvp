import { ViabilityResponseWithAssessment } from "../types/ViabilityResponseWithAssessment"

export type Decision =
  | "VIABLE_AND_ACCEPTABLE"
  | "VIABLE_BUT_BLOCKED"
  | "NON_VIABLE"

export function classifyDecision(
  result: ViabilityResponseWithAssessment
): Decision {
  if (!result.viable) return "NON_VIABLE"

  const a = result.assessment
  if (a && (a.safety === false || a.cost === false || a.goal === false)) {
    return "VIABLE_BUT_BLOCKED"
  }

  return "VIABLE_AND_ACCEPTABLE"
}
