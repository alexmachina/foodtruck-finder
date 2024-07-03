"use client";
import { FormEventHandler, useCallback, useState } from "react";
import PromptForm from "./_containers/PromptInput/PromptForm";
import { fetchCandidatesWithPrompt } from "./_apis/foodTruckFinderApi";
import FoodTruckCandidates from "./_containers/FoodTruckCandidates/FoodTruckCandidates";
import { PublicFoodtruck } from "./api/_services/foodtruckController/types";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [candidates, setCandidates] = useState<PublicFoodtruck[]>([]);

  const onPromptChange = useCallback((value: string) => {
    setPrompt(value);
  }, []);

  const onPromptSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      if (!prompt) {
        return;
      }
      setIsLoading(true);
      setHasNoResults(false);
      const responseCandidates = await fetchCandidatesWithPrompt(prompt);
      setCandidates(responseCandidates);
      setIsLoading(false);
      setHasNoResults(responseCandidates.length === 0);
    },
    [prompt]
  );

  return (
    <main className="w-full">
      <article className="prose pt-[120px] md:pt-[220px] mx-auto w-full">
        <div className="mx-auto">
          <h1 className="text-center w-full">Food Truck Finder</h1>
          <h3 className="w-full leading-10 text-center">
            Type your instructions, and we&apos;ll find the best food trucks for
            you in{" "}
            <span className="text-primary bg-slate-800 rounded-md p-2 ">
              San Francisco
            </span>{" "}
          </h3>

          <PromptForm
            value={prompt}
            isLoading={isLoading}
            onChange={onPromptChange}
            onSubmit={onPromptSubmit}
          />
        </div>
      </article>
      <div className="flex flex-col justify-center w-full mt-8  mb-16 px-8">
        <FoodTruckCandidates candidates={candidates} isLoading={isLoading} />
        {hasNoResults && (
          <h2 className="text-center">
            No food trucks found that match the instructions, try another one!
          </h2>
        )}
      </div>
    </main>
  );
}
