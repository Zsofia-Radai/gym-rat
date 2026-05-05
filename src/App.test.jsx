import { render, screen } from "@testing-library/react";
import { beforeEach, test, expect } from "vitest";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

test("renders the GymRat home screen", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /gymrat/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /templates/i })).toBeInTheDocument();
});
