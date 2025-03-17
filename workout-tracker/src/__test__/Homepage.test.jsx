import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Homepage from "../components/Homepage/Homepage.jsx";

describe("Homepage Component", () => {
    test("renders homepage correctly", () => {
        render(
          <BrowserRouter>
            <Homepage />
          </BrowserRouter>
        );
      
        // Check main heading
        expect(screen.getByText(/think less,/i)).toBeInTheDocument();
        expect(screen.getByText(/lift more!/i)).toBeInTheDocument();
        expect(screen.getByText(/transform your body and mind/i)).toBeInTheDocument();
      
        // Check "Why Choose Us" section
        expect(screen.getByText(/why choose us/i)).toBeInTheDocument();
        expect(screen.getByText(/tracking your fitness journey/i)).toBeInTheDocument();
      
        // Check "Our Programs" section
        expect(screen.getByText(/our programs/i)).toBeInTheDocument();
        expect(screen.getByText(/unlock powerful tools/i)).toBeInTheDocument();
    });
      

    test("renders detail cards correctly", () => {
        render(
        <BrowserRouter>
            <Homepage />
        </BrowserRouter>
        );

        expect(screen.getByText("Personalized Fitness Plans")).toBeInTheDocument();
        expect(screen.getByText("Modern Equipment")).toBeInTheDocument();
        expect(screen.getByText("Progress Tracking & Analytics")).toBeInTheDocument();
    });

    test("renders program cards correctly", () => {
        render(
        <BrowserRouter>
            <Homepage />
        </BrowserRouter>
        );

        expect(screen.getByText("Cardio & Endurance")).toBeInTheDocument();
        expect(screen.getByText("Flexibility & Mobility")).toBeInTheDocument();
        expect(screen.getByText("Strength Training")).toBeInTheDocument();
    });

    test("Join Now button links to login page", () => {
        render(
        <BrowserRouter>
            <Homepage />
        </BrowserRouter>
        );

        const joinNowButton = screen.getByText("Join Now").closest("a");
        expect(joinNowButton).toHaveAttribute("href", "/login");
    });
});
