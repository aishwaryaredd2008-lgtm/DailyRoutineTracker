import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("shows error when login fields are empty", () => {
  render(<App />);

  fireEvent.click(screen.getByText("Login"));

  expect(screen.getByText("Fill all fields")).toBeInTheDocument();
});

test("login works with email and password", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "test@gmail.com" },
  });

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "12345" },
  });

  fireEvent.click(screen.getByText("Login"));

  expect(screen.getByText("Daily Routine Tracker")).toBeInTheDocument();
});

test("integration test login and add habit", async () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "test@gmail.com" },
  });

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "12345" },
  });

  fireEvent.click(screen.getByText("Login"));
  fireEvent.click(screen.getByText("Habits"));

  const habitInput = await screen.findByPlaceholderText("Enter habit");

  fireEvent.change(habitInput, {
    target: { value: "Wake up early" },
  });

  fireEvent.click(screen.getByText("Add Habit"));

  expect(screen.getByText("Wake up early")).toBeInTheDocument();
});