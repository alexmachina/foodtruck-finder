import { PublicFoodtruck } from "../api/_services/foodtruckController/types";

const fetchCandidatesWithPrompt = async (
  prompt: string
): Promise<PublicFoodtruck[]> => {
  const url = "/api/prompt";
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  const result = (await response.json()) as PublicFoodtruck[];
  return result;
};

export { fetchCandidatesWithPrompt };
