import { render, screen } from "@testing-library/react";
import Home from "./Home";
test("renders Welcome to Expense Tracker as text", () => {
  // Arrange
  render(<Home />);
  //Act
  //..nothing

  //Assert
  const title = screen.getByText("Welcome to Expense Tracker");
  expect(title).toBeInTheDocument();
});
