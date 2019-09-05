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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { mode, transition, back, history } = useVisualMode(props.interview ? SHOW : EMPTY);
  const CANCEL = back;

  function save(name, interviewer) {
    const interview = { student: name, interviewer};

    transition(SAVING);
    
    let status = Promise.resolve(props.bookInterview(props.id, {...interview}));

    status.then(value => {
      transition(value, true, 2);
      console.log("Finished add", mode, "in", history);
    });
  };
  
  return (
    <article className="appointment">
      <Header
      time={props.time}
      />
      {mode === CREATE && <Form  interviewers={props.interviewers} onSave={save} onCancel={CANCEL}/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer}/>)}
    </article>    );
}