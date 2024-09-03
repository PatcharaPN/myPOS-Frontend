import { render, screen } from "@testing-library/react";
import Login from "../pages/Login/Login";

test("renders login form", () => {
  render(<Login />);
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByText(/remember me/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByRole("img")).toBeInTheDocument();
});
