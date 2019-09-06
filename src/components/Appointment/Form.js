import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function FormData(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel = function() {
    reset();
    props.onCancel();
  };
  
  const reset = function() {
    setName("");
    setInterviewer(null);
  };

  const save = () => props.onSave(name || props.student, interviewer || props.interviewer);

  console.log("On form - name:", name, "interviewer:", interviewer);
  
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="student name"
          type="text"
          placeholder="Enter Student Name"
          value={name || props.student}
          onChange={event => setName(event.target.value)}
          required="required"
        />
      </form>
      <InterviewerList interviewers={props.interviewers} value={interviewer || props.interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={save}>Save</Button>
      </section>
    </section>
  </main>
 );
}