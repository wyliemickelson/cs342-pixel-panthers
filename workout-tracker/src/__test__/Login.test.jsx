import { render, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import LoginPage from "../components/LoginPage/LoginPage.jsx";

// Create a mock Redux store, because the useage of useDispatch()
const mockStore = configureStore([]);
const store = mockStore({});

describe("Login", () => {
    test("render login form correctly", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>
            </Provider>
        );

        const loginContainer = document.querySelector(".login-form");

        expect(loginContainer).toBeInTheDocument();

        // Now query inputs inside the login form container
        const emailInput = within(loginContainer).getByPlaceholderText("Enter your email");
        const passwordInput = within(loginContainer).getByPlaceholderText("Enter your password");

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        // Query the submit button within the login form
        const submitButton = within(loginContainer).getByRole("button", { name: /submit/i });

        expect(submitButton).toBeInTheDocument();
    });

    test("handle users input correctly", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>
            </Provider>
        );
    
        const loginContainer = document.querySelector(".login-form");
        const emailInput = within(loginContainer).getByPlaceholderText("Enter your email");
        const passwordInput = within(loginContainer).getByPlaceholderText("Enter your password");
    
        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(passwordInput, "password123");
    
        expect(emailInput).toHaveValue("test@example.com");
        expect(passwordInput).toHaveValue("password123");
    });
    
});
