import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddNewActivity from "../components/AddNewActivity";

export const mockProps = {
  data: { number: "4", activities: [{ id: "1", name: "Sleep" }] },
};

test("the create activity button is disabled on initial render", async () => {
  render(<AddNewActivity date={mockProps} />);
  const createButton = screen.getByRole("button", /Add Activity Idea/i);
  expect(createButton).toBeDisabled();
});

test("the create button is enabled when the input has text", async () => {
  render(<AddNewActivity date={mockProps} />);
  const createButton = screen.getByRole("button", /Add Activity Idea/i);
  const newEventInput = screen.getByPlaceholderText(/Type your idea here/i);
  userEvent.type(newEventInput, "New Event");
  expect(createButton).toBeEnabled();
});
