import React from "react";
// import React, { Fragment } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss"

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETING = "DELETING";
const EMPTY = "EMPTY";
const SAVING = "SAVING";
const SHOW = "SHOW";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  console.log("In Appointment:", props.id, "with", props.interview);

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  const CANCEL = back;

    /**
   * Function to funnel the information from components
   * @name {string} student name for appointment or null for delete.
   * @interviewer {numeric} interviewer number or null for delete
   */
  function checker(name, interviewer) {
    if (!props.interview) {
      save(name, interviewer);
    } else if (props.interview["student"] !== name || props.interview["interviewer"]["id"] !== interviewer["id"]) {
      console.log("Edit:", props.interview.student, props.interview.interviewer, name, interviewer);
      const interview = { student: name, interviewer};

      transition(SAVING, true);

      let status = Promise.resolve(props.bookInterview(props.id, {...interview}));
      status
        .then(value => (value === SHOW) ? transition(value, true) : transition(ERROR_SAVE, true));
    } else {
      // console.log("No change:", props.interview.student, props.interview.interviewer["id"], name, interviewer);

      transition(SHOW, true);
    }
  };

  function save(name, interviewer) {
    const interview = { student: name, interviewer};
    console.log("@save", name, "and", interviewer);

    transition(SAVING, true);

    let status = Promise.resolve(props.bookInterview(props.id, {...interview}));
    status
      .then(value => transition(value, true));
  };

  function cancel() {
    transition(DELETING, true);
    let status = Promise.resolve(props.cancelInterview(props.id));
    status
      .then(value => transition(value, true));
    // console.log("Finished @edit");
  };
  
  return (
    <article className="appointment">
      <Header
      time={props.time}
      />
      {mode === CONFIRM && <Confirm message={"Delete the appointment?"} onCancel={CANCEL} onConfirm={cancel} />}
      {mode === CREATE && <Form  interviewers={props.interviewers} student={props.interview ? props.interview.student : ''} interviewer={props.interview ? props.interview.interviewer : null} onSave={checker} onCancel={CANCEL}/>}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === ERROR_DELETE && <Error message={"Could not delete appointment."} onClose={CANCEL}/>}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment."} onClose={CANCEL}/>}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={transition} toConfirm={CONFIRM}
      onEdit={transition} toForm={CREATE} />}
    </article>    );
}