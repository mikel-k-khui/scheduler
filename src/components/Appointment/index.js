import React, { useEffect } from "react";
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

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  const CANCEL = back;

  /**
 * Function to funnel the information from components
 * @name {string} student name for appointment or null for delete.
 * @interviewer {numeric} interviewer number or null for delete
 */
  function edit(name, interviewer) {
    const interview = (interviewer && name ? { student: name, interviewer} : null);

    transition(interviewer && name ? SAVING : DELETING);

    const call = (interviewer && name ?
      props.bookInterview(props.id, {...interview}) : 
      props.cancelInterview(props.id));
    
    let status = Promise.resolve(call);

    status.then(value => {
      transition(value, true);
    });
    console.log("Finished @edit", mode);
  };
  
  return (
    <article className="appointment">
      <Header
      time={props.time}
      />
      {mode === CONFIRM && <Confirm message={"Delete the appointment?"} onCancel={CANCEL} onConfirm={edit} />}
      {mode === CREATE && <Form  interviewers={props.interviewers} onSave={edit} onCancel={CANCEL}/>}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={transition} onConfirm={CONFIRM}/>}
    </article>    );
}