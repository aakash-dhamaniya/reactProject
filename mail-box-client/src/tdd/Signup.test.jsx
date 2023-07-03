import { render, screen } from "@testing-library/react";
import Signup from "../pages/Signup";
test("renders SignUp text", () => {
  render(<Signup />);
  const SignUpElement = screen.getByText("Sign Up");
  expect(SignUpElement).toBeInTheDocument();
});
