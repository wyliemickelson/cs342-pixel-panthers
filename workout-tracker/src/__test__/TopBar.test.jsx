import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TopBar from "../components/PlanPage/TopBar";
import { vi } from "vitest";

describe("TopBar Component", () => {
  const mockToggleModal = vi.fn();
  const mockSetDate = vi.fn();
  const testDate = new Date("2025-03-16");

  test("renders TopBar correctly", () => {
    render(
      <BrowserRouter>
        <TopBar date={testDate} onSetDate={mockSetDate} toggleModal={mockToggleModal} />
      </BrowserRouter>
    );

    expect(screen.getByText("Add Plan")).toBeInTheDocument(); // add Plan Button
    expect(screen.getByText("Filter")).toBeInTheDocument(); // filter Button
    expect(screen.getByPlaceholderText("Search Task")).toBeInTheDocument(); // search Input
    expect(screen.getByText("Current Workout")).toBeInTheDocument(); // current Workout Link
  });

  test("calls toggleModal when Add Plan button is clicked", () => {
    render(
      <BrowserRouter>
        <TopBar date={testDate} onSetDate={mockSetDate} toggleModal={mockToggleModal} />
      </BrowserRouter>
    );

    const addPlanButton = screen.getByText("Add Plan");
    fireEvent.click(addPlanButton);

    expect(mockToggleModal).toHaveBeenCalledTimes(1); // modal function is called
  });

  test("navigates to Current Workout page", () => {
    render(
      <BrowserRouter>
        <TopBar date={testDate} onSetDate={mockSetDate} toggleModal={mockToggleModal} />
      </BrowserRouter>
    );

    const currentWorkoutLink = screen.getByText("Current Workout");
    expect(currentWorkoutLink.closest("a")).toHaveAttribute("href", "/current-workout"); // ensure correct navigation link
  });
});
