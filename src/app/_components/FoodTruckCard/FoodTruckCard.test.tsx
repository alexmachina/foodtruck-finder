import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import FoodTruckCard from "./FoodTruckCard";

/**
 * Simple test to check if the card renders correctly
 */
describe("Button", () => {
  it("Should render with the content passed as parameter", () => {
    const applicant = "Alex Restaurant";
    const foods = ["Strawberry"];
    const reason = "A cool place to eat";

    render(
      <FoodTruckCard applicant={applicant} foods={foods} reason={reason} />
    );

    expect(screen.getByText(applicant)).toBeInTheDocument();
    expect(screen.getByText(foods[0])).toBeInTheDocument();
    expect(screen.getByText(reason)).toBeInTheDocument();
  });
});
