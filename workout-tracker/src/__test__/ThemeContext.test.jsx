import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, ThemeContext } from "../contexts/ThemeContext";
import { vi } from "vitest";
import { useContext } from "react";

// Helper component to consume context in tests
const TestComponent = () => {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <p data-testid="theme-text">Current Theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Set Dark Theme</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("default theme is 'light'", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-text")).toHaveTextContent("Current Theme: light");
  });

  test("setTheme updates the theme correctly", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const setDarkThemeButton = screen.getByText("Set Dark Theme");
    fireEvent.click(setDarkThemeButton);

    await waitFor(() => {
      expect(screen.getByTestId("theme-text")).toHaveTextContent("Current Theme: dark");
    });

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  test("toggleTheme switches between 'light' and 'dark'", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText("Toggle Theme");

    // Toggle to dark
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByTestId("theme-text")).toHaveTextContent("Current Theme: dark");
    });

    // Toggle back to light
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByTestId("theme-text")).toHaveTextContent("Current Theme: light");
    });
  });
});
