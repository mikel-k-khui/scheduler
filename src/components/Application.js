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
    stateR,
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  let appScript = '';
  console.log("Before getInterviewers:", state, "and", stateR);
  
  const interviewers = getInterviewersForDay(state, stateR.day);
  appScript = getAppointmentsForDay(state, stateR.day).map(appointment => {
    console.log("Map app", appointment, stateR);
    return (<Appointment key={appointment.id}
      {...appointment}
      interview={getInterview(state, appointment.interview)}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />);
    });

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
          value={stateR.day}
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