import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders inventory list", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Inventory List")).toBeInTheDocument();
});

test("navigates to edit inventory list", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getAllByText("Edit List")[0]);
  expect(screen.getByText("Your code goes here")).toBeInTheDocument();
});

test.skip("adds item to list", () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );
  // Add your test here
});

test.skip("removes items from list", () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );
  // Add your test here
});

test.skip("clears list", () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );
  // Add your test here
});
