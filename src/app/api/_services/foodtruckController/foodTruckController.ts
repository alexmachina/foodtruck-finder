import {
  FoodtruckCsvData,
  downloadFoodtruckCsv,
} from "@/app/api/_repositories/dataSfGov";
import { fetchGptCompletion } from "@/app/api/_repositories/openAiApi";
import { PromptResponseFoodtruck, PublicFoodtruck } from "./types";
import buildSystemPrompt from "./functions/buildSystemPrompt";
import attachCandidateAddresses from "./functions/attachCandidateAddresses";

const queryFoodtrucksByPrompt = async (prompt: string) => {
  const csv = await downloadFoodtruckCsv();
  const systemPrompt = buildSystemPrompt(csv);
  const promptResult = await fetchGptCompletion(systemPrompt, prompt);
  const candidates = JSON.parse(promptResult)
    .candidates as PromptResponseFoodtruck[];

  const candidatesWithAddress = attachCandidateAddresses(candidates, csv);
  return candidatesWithAddress;
};

export { queryFoodtrucksByPrompt };
