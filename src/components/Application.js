// import React, { useState, useEffect } from "react";
// import InterviewerList from "./InterviewerList";
// import { resolve } from "url";

import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  console.log("Before render:", state);

  let appScript = '';
  const interviewers = getInterviewersForDay(state, state.day);

  if (state["days"].length !== 0 && Object.keys(state["interviewers"]).length > 0 &&
    Object.keys(state["appointments"]).length > 0) {
    // if (state.days && state.interviewers && state.appointments) {
      appScript = getAppointmentsForDay(state, state.day).map(appointment => {
        return (<Appointment key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          />);
        });
      }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appScript}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}