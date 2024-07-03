import { FoodtruckCsvData } from "@/app/api/_repositories/dataSfGov";
import { PromptInputFoodtruck } from "../types";
import { unparse } from "papaparse";

const buildSystemPrompt = (csv: FoodtruckCsvData[]) => {
  const filterApprovedAndPickFields = (data: FoodtruckCsvData[]) => {
    return data
      .filter((row) => row.Status === "APPROVED")
      .map((row) => {
        const fieldsToPick = ["Applicant", "FoodItems"];
        const filteredRow: Partial<FoodtruckCsvData> = {};
        fieldsToPick.forEach((field) => {
          if (row[field] !== undefined) {
            filteredRow[field] = row[field];
          }
        });

        return filteredRow;
      }) as unknown as PromptInputFoodtruck[];
  };

  const filterUniqApplicants = (objects: PromptInputFoodtruck[]) => {
    const uniqueNames = new Set<string>();
    const uniqueObjects: PromptInputFoodtruck[] = [];

    for (const item of objects) {
      if (!uniqueNames.has(item.Applicant)) {
        uniqueNames.add(item.Applicant);
        uniqueObjects.push(item);
      }
    }

    return uniqueObjects;
  };

  const filteredData = filterApprovedAndPickFields(csv);
  const uniqueApplicants = filterUniqApplicants(filteredData);
  const promptCsv = unparse(uniqueApplicants);

  const prompt = `You are a helpful assistant that helps in choosing the best foodtruck candidates 
    from the list based on the user input and on the following foodtrucks(in csv format): ${promptCsv}
    Return a list of applicants as json array, following the structure:
    {
      candidates: [{
        "applicant": "example",
        "reason": "The reason why this is a good applicant"
        "foods": ["Hot Dogs", "Shakes"]
    }]
  }`;

  return prompt;
};

export default buildSystemPrompt;
