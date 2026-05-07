import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, test, expect } from "vitest";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, "", "/");
});

test("renders the GymRat home screen", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /gymrat/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /templates/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /sessions/i })).toBeInTheDocument();
  expect(screen.getByText(/no templates yet/i)).toBeInTheDocument();
});

test("shows the empty sessions state from the sessions tab", async () => {
  render(<App />);

  await userEvent.click(screen.getByRole("link", { name: /sessions/i }));

  expect(screen.getByText(/total sessions/i)).toBeInTheDocument();
  expect(screen.getByText(/no sessions yet/i)).toBeInTheDocument();
});

test("creates a workout template", async () => {
  render(<App />);

  await userEvent.click(screen.getByRole("button", { name: /new/i }));
  await userEvent.type(screen.getByPlaceholderText(/template name/i), "Push Day");
  await userEvent.type(
    screen.getByPlaceholderText(/exercise name/i),
    "Bench press",
  );
  await userEvent.clear(screen.getByPlaceholderText(/sets/i));
  await userEvent.type(screen.getByPlaceholderText(/sets/i), "3");
  await userEvent.clear(screen.getByPlaceholderText(/reps/i));
  await userEvent.type(screen.getByPlaceholderText(/reps/i), "10");
  await userEvent.clear(screen.getByPlaceholderText(/kg/i));
  await userEvent.type(screen.getByPlaceholderText(/kg/i), "60");

  await userEvent.click(
    screen.getByRole("button", { name: /save template/i }),
  );

  expect(screen.getByText(/push day/i)).toBeInTheDocument();
  expect(screen.getByText(/1 exercises/i)).toBeInTheDocument();
  expect(screen.getByText(/template saved/i)).toBeInTheDocument();
});

test("validates required template fields", async () => {
  render(<App />);

  await userEvent.click(screen.getByRole("button", { name: /new/i }));
  await userEvent.click(
    screen.getByRole("button", { name: /save template/i }),
  );

  expect(screen.getByText(/template name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/exercise name is required/i)).toBeInTheDocument();
  expect(screen.getAllByText(/invalid/i)).toHaveLength(2);
  expect(screen.getByText(/no templates yet/i)).toBeInTheDocument();
});
