import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import TextArea from "./TextArea";

describe("TextArea", () => {
  it("Should render when called", () => {
    render(<TextArea data-testid="textarea" />);
    const textAreaElement = screen.getByTestId("textarea");
    expect(textAreaElement).toBeInTheDocument();
  });

  it("Should change its value when text is input", () => {
    render(<TextArea data-testid="textarea" />);
    const textAreaElement = screen.getByTestId("textarea");
    fireEvent.change(textAreaElement, { target: { value: "Hello, World!" } });
    expect(textAreaElement).toBeInTheDocument();
  });
});
