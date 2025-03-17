import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeContext } from "../contexts/ThemeContext";
import ThemePage from "../components/ThemePage/ThemePage.jsx";
import { vi } from "vitest";

describe("ThemePage Component", () => {
  const mockSetTheme = vi.fn();

  const renderWithTheme = (theme) => {
    return render(
      <ThemeContext.Provider value={{ theme, setTheme: mockSetTheme }}>
        <ThemePage />
      </ThemeContext.Provider>
    );
  };

  test("renders ThemePage correctly", () => {
    renderWithTheme("light");

    expect(screen.getByText("Choose a Theme")).toBeInTheDocument();
    expect(screen.getByText("Current Theme: light")).toBeInTheDocument();
    expect(screen.getByText("Light Theme")).toBeInTheDocument();
    expect(screen.getByText("Dark Theme")).toBeInTheDocument();
  });

  test("updates theme to 'light' when clicking Light Theme button", () => {
    renderWithTheme("dark");

    const lightButton = screen.getByText("Light Theme");
    fireEvent.click(lightButton);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  test("updates theme to 'dark' when clicking Dark Theme button", () => {
    renderWithTheme("light");

    const darkButton = screen.getByText("Dark Theme");
    fireEvent.click(darkButton);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
