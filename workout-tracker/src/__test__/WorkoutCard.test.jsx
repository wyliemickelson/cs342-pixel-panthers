import { render, screen, fireEvent } from "@testing-library/react";
import WorkoutCard from "../components/WorkoutPage/WorkoutCard/WorkoutCard";
import { vi } from "vitest";

describe("WorkoutCard Component", () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  const mockAnaerobicWorkout = {
    _id: "1",
    title: "Strength Training",
    anaerobicExercises: [
      { name: "Bench Press", sets: "3", reps: "10", weight: "100 lbs" },
    ],
    aerobicExercises: [],
  };

  const mockAerobicWorkout = {
    _id: "2",
    title: "Cardio Session",
    anaerobicExercises: [],
    aerobicExercises: [
      { name: "Running", minutes: "30", intensity: "Medium" },
    ],
  };

  test("renders anaerobic workout correctly", () => {
    render(<WorkoutCard workout={mockAnaerobicWorkout} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText("Strength Training")).toBeInTheDocument();
    expect(screen.getByText("Bench Press")).toBeInTheDocument();
    expect(screen.getByText("Sets: 3")).toBeInTheDocument();
    expect(screen.getByText("Reps: 10")).toBeInTheDocument();
    expect(screen.getByText("Starting at 100 lbs")).toBeInTheDocument();
  });

  test("renders aerobic workout correctly", () => {
    render(<WorkoutCard workout={mockAerobicWorkout} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText("Cardio Session")).toBeInTheDocument();
    expect(screen.getByText("Running")).toBeInTheDocument();
    expect(screen.getByText("30 minutes at Medium intensity.")).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", () => {
    render(<WorkoutCard workout={mockAnaerobicWorkout} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const editButton = screen.getByAltText("edit").closest("button");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith("1");
  });

  test("calls onDelete when delete button is clicked", () => {
    render(<WorkoutCard workout={mockAnaerobicWorkout} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByText("x");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });
});
