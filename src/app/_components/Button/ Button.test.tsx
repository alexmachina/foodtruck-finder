import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import Button from "./Button";

/**
 * Simple test to check if the button is rendering and the onClick event is firing.
 */
describe("Button", () => {
  it("Should render with the content passed as children", () => {
    render(<Button>Hello</Button>);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("Should trigger the onClick event when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Hello</Button>);
    fireEvent.click(screen.getByText("Hello"));

    expect(onClick).toHaveBeenCalled();
  });
});
