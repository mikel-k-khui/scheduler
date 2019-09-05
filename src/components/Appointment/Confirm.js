import React from "react";
import Button from "../Button"

export default function Show(props) {
  const cancel = () => props.onConfirm(null, null);
  
  return (
<main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{props.message}</h1>
  <section className="appointment__actions">
    <Button danger onClick={props.onCancel}>Cancel</Button>
    <Button danger onClick={cancel}>Confirm</Button>
  </section>
</main>
  );
}