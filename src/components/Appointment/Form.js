import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function FormData(props) {
  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const cancel = function() {
    reset();
    props.onCancel();
  };
  
  const reset = function() {
    setName("");
    setInterviewer(null);
    setError("");
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");

    props.onSave(name, interviewer);
  };

  // console.log("On form - name:", props.student, "interviewer:", interviewer, "and error:", error);
  
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="student name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={event => setName(event.target.value)}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm disable={!interviewer} onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
 );
}