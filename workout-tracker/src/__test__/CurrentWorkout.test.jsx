import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { vi } from "vitest";
import CurrentWorkout from "../components/CurrentWorkout/CurrentWorkout.jsx";
import { updateTask } from "../store/slices/authSlice";

// Mock Redux Store
const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    user: {
      email: "test@example.com",
      currentTaskId: "123",
      tasks: [
        {
          _id: "123",
          title: "Test Workout",
          workout: {
            anaerobicExercises: [{ name: "Bench Press", sets: 3, weight: 100, reps: 10, status: "incomplete" }],
            aerobicExercises: [{ name: "Running", minutes: 30, status: "incomplete" }]
          }
        }
      ]
    }
  }
});

// Mock `fetch` to avoid real API calls
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("CurrentWorkout", () => {
  test("renders workout title and exercises", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CurrentWorkout />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Test Workout")).toBeInTheDocument(); // title
    expect(screen.getByText("Bench Press")).toBeInTheDocument(); // anaerobic Exercise
    expect(screen.getByText("Running")).toBeInTheDocument(); // aerobic Exercise
  });

  test("starts and stops the timer", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CurrentWorkout />
        </BrowserRouter>
      </Provider>
    );

    const startButton = screen.getByText("Start timer");
    fireEvent.click(startButton);
    expect(startButton.textContent).toBe("Stop timer");

    fireEvent.click(startButton);
    expect(startButton.textContent).toBe("Start timer");
  });

  test("checks and unchecks an exercise", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CurrentWorkout />
        </BrowserRouter>
      </Provider>
    );

    const checkbox = screen.getAllByRole("checkbox")[0]; // Select the first checkbox
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  test("calls API when saving workout", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CurrentWorkout />
        </BrowserRouter>
      </Provider>
    );

    const saveButton = screen.getByText("Save Workout");
    fireEvent.click(saveButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
