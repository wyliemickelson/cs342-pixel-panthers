import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import AddPlanModal from "../components/PlanPage/AddPlanModal";
import { addTask } from "../store/slices/authSlice";

// Mock Redux Store
const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    user: {
      email: "test@example.com",
      customWorkouts: [
        { _id: "1", title: "Full Body Workout", aerobicExercises: [], anaerobicExercises: [] },
      ],
    },
    token: "mockToken",
  },
});

// Mock `fetch` to avoid real API calls
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ userTasks: [] }),
  })
);

describe("AddPlanModal", () => {
  const mockToggleModal = vi.fn();

  test("renders modal correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddPlanModal toggleModal={mockToggleModal} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Add Plan")).toBeInTheDocument(); // modal title
    expect(screen.getByText("Repeat All week")).toBeInTheDocument(); // checkbox label
    expect(screen.getByText("Submit")).toBeInTheDocument(); // submit button
  });

  test("selects a workout preset", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddPlanModal toggleModal={mockToggleModal} />
        </BrowserRouter>
      </Provider>
    );
  
    // Open the dropdown
    const dropdown = screen.getByPlaceholderText("Select workout preset...");
    fireEvent.click(dropdown);
  
    // Wait for the dropdown options to render
    await waitFor(() => expect(screen.getByText("Full Body Workout")).toBeInTheDocument());
  
    // Click on "Full Body Workout"
    fireEvent.click(screen.getByText("Full Body Workout"));
  
    // Ensure the selection is updated
    expect(screen.getByText("Full Body Workout")).toBeInTheDocument();
  });
  

  
  test("submits the form and calls API", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddPlanModal toggleModal={mockToggleModal} />
        </BrowserRouter>
      </Provider>
    );
  
    // Open dropdown and select workout preset
    const presetDropdown = screen.getByPlaceholderText("Select workout preset...");
    fireEvent.click(presetDropdown);
    await waitFor(() => fireEvent.click(screen.getByText("Full Body Workout")));
  
    // Click submit button
    fireEvent.click(screen.getByText("Submit"));
  
    // Wait for API call
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
  

  test("closes modal when cancel button is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddPlanModal toggleModal={mockToggleModal} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockToggleModal).toHaveBeenCalled();
  });
});
