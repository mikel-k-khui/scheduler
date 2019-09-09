import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  const students = {
      name: "Lydia Miller-Jones"
    };

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form student={students.name} interviewers={interviewers} />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
  const mockSave = jest.fn();
  const { getByText } = render(<Form student={""} interviewers={interviewers} onSave={mockSave} />);

  fireEvent.click(getByText("Save"));

  /* 1. validation is shown */
  expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
  /* 2. onSave is not called */
  expect(mockSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    const mockSave = jest.fn();
    const { queryByText } = render(<Form student={students.name} interviewers={interviewers}  onSave={mockSave} />);

    fireEvent.click(queryByText("Save"));

    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    /* 4. onSave is called once*/
    expect(mockSave).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(mockSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("calls onCancel function to clear the field and return to SHOW or EMPTY", () => {
    const mockCancel = jest.fn();
    const { queryByPlaceholderText, getByPlaceholderText, getByText } = render(<Form interviewers={interviewers} onCancel={mockCancel} />);

    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Cancel"));

    /* 1. Expect the reset to celar the name field */
    expect(queryByPlaceholderText("Enter Student Name")).toHaveValue("");

    /* 2. onSave is called once*/
    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  xit("calls onSave function when the name is defined", () => {});

  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});