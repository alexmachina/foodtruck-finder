import { FoodtruckCsvData } from "@/app/api/_repositories/dataSfGov";
import { PromptResponseFoodtruck, PublicFoodtruck } from "../types";

const attachCandidateAddresses = (
  candidates: PromptResponseFoodtruck[],
  csv: FoodtruckCsvData[]
): PublicFoodtruck[] => {
  return candidates.map((candidate) => {
    const addresses = csv
      .filter((csvCandidate) => candidate.applicant === csvCandidate.Applicant)
      .map((c) => `${c.LocationDescription}`);
    return { ...candidate, addresses };
  });
};

export default attachCandidateAddresses;
