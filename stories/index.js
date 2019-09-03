import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const interviewer = {
  id: 1,
  name: "Doctor Stephen Strange",
  avatar: "https://pbs.twimg.com/profile_images/687990268268773376/ZxsrfCpr_400x400.png"
};

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  ];

storiesOf("Form", module) //Initiates Form components
  .add("Create", () => (
    <Form interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />))
  .add("Edit", () => (
    <Form interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
      name={"Wanda Maximoffe"}
      interviewer={2}
    />));

storiesOf("Appointment", module) //Initiates Appointment component
  .addParameters({ backgrounds: [{ name: "white", value: "#fff", default: true }]})
  .add("Appointment", () => <Appointment />)
  .add("Appointment with time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => (
    <Show
      student={"Wanda Maximoffe"}
      interviewer={interviewer}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  ))
  .add("Confirm", () => (
    <Confirm
      message={"Delete the appointment?"}
      onCancel={action("onCancel")}
      onConfirm={action("onConfirm")}
    />
  ))
  .add("Saving", () => <Status message={"Saving"} />)
  .add("Deleting", () => <Status message={"Deleting"} />)
  .add("Error Saving", () => <Error message={"Could not save appointment."} onClose={action("onClose")}/>)
  .add("Error Deleting", () => <Error message={"Could not delete appointment."} onClose={action("onClose")}/>);

storiesOf("InterviewerListItem", module) //Initiates Storybook to render an interviewer
.addParameters({
  backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
})
.add("Unselected", () => (
  <InterviewerListItem
    id={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
  />
))
.add("Selected", () => (
  <InterviewerListItem
    id={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected
  />
))
.add("Clickable", () => (
  <InterviewerListItem
    id={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    setInterviewer={event => action("setInterviewer")(interviewer.id)}
  />
));

storiesOf("InterviewerList", module) //Initiates Storybook to render all interviewer
.addParameters({
  backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
})
.add("Initial", () => (
  <InterviewerList
    interviewers={interviewers}
    onChange={action("onChange")}
  />
))
.add("Preselected", () => (
  <InterviewerList
    interviewers={interviewers}
    value={3}
    onChange={action("onChange")}
  />
));

storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));
  
storiesOf("DayList", module) //Initiates Storybook and registers our DayList component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));
