import { parse } from "papaparse";

export type FoodtruckCsvData = Record<string, number | string>;

const downloadFoodtruckCsv = async () => {
  const csvUrl = "https://data.sfgov.org/api/views/rqzj-sfat/rows.csv";

  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error("Network response error");
  }

  const csvData = await response.text();

  const parsedData = parse<FoodtruckCsvData>(csvData, {
    header: true,
    skipEmptyLines: true,
  });

  return parsedData.data;
};

export { downloadFoodtruckCsv };
