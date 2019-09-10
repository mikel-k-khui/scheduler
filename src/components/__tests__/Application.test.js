import React from "react";
import axios from "axios";

import Application from "components/Application";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, mockRejectedValueOnce,
  getByText, getAllByTestId, getByAltText, getByPlaceholderText, getByDisplayValue,
  queryByText, queryByAltText} from "@testing-library/react";
import { exportAllDeclaration } from "@babel/types";

afterEach(cleanup);

describe("Application", () => {
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button of Archie Cohen's appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Find and change the elemetn with placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), { target: { value: "Doctor Stephen Strange" } });

    // 5. CLick on a different appointment alt name of interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Check that the element with the text "Saving" is displayed.
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Simulate error message and expect to get the Text of Delete the appointment
    await waitForElement(() => getByText(appointment, "Could not save appointment."));
 
    // 8. Click on the Close button by alt text
    fireEvent.click(getByAltText(appointment, "Close"));
    // console.log("Check close:", prettyDOM(appointment));

    // 9. Check the element Archie Cohen still exists
    getByText(container, "Archie Cohen")

    // 10. Check that the DayListItem with the text "Monday" remains with the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    const spots = getByText(day, "1 spot remaining");
    expect(spots).toBeInTheDocument();
  })

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button of Archie Cohen's appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check the confirmation page is loaded and click the confirm button.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // console.log("Check deleting:", prettyDOM(appointment));

    // 7. Simulate error message and expect to get the Text of Delete the appointment
    await waitForElement(() => getByText(appointment, "Could not delete appointment."));
 
    // 8. Click on the Close button by alt text
    fireEvent.click(getByAltText(appointment, "Close"));
    // console.log("Check close:", prettyDOM(appointment));

    // 9. Check the element Archie Cohen still exists
    getByText(container, "Archie Cohen")

    // 10. Check that the DayListItem with the text "Monday" remains with the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    const spots = getByText(day, "1 spot remaining");
    expect(spots).toBeInTheDocument();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Edit" button of Archie Cohen's appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Find and change the elemetn with placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), { target: { value: "Doctor Stephen Strange" } });

    // 5. CLick on a different appointment alt name of interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Check that the element with the text "Saving" is displayed.
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the element with the  button is displayed.
    await waitForElement(() => queryByText(appointment, "Doctor Stephen Strange"));
  
    // 8. Check that the DayListItem with the text "Monday" remains with the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    const spots = getByText(day, "1 spot remaining");
    expect(spots).toBeInTheDocument();

    // debug();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button of Archie Cohen's appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check the confirmation page is loaded and click the confirm button.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => queryByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    const spots = getByText(day, "2 spots remaining");
    expect(spots).toBeInTheDocument();

    // debug();
  });

  // Render the Application.
  // Wait until the text "Archie Cohen" is displayed.
  // Click the "Add" button on the first empty appointment.
  // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  // Click the first interviewer in the list.
  // Click the "Save" button on that same appointment.
  // Check that the element with the text "Saving" is displayed.
  // Wait until the element with the text "Lydia Miller-Jones" is displayed.
  // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log("Container", prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // console.log("Apppointment id:", prettyDOM(appointment));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // console.log("In wait:", prettyDOM(appointment));

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    const spots = getByText(day, "no spots remaining");
    
    expect(spots).toBeInTheDocument();
    // console.log("Spots remaining:", prettyDOM(spots));
  });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });

  // xit("renders without crashing", () => {
  //   render(<Application />);
  // });

});