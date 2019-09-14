// import React, { useState, useEffect } from "react";
// import InterviewerList from "./InterviewerList";
// import { resolve } from "url";

import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";
import Status from "components/Appointment/Status";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

    /**
   * Render a list of Appointment DOMs
   * @return [<Appointment />]
   */
  function getRender() {
    return getAppointmentsForDay(state, state.day).map(appointment => {
      return (<Appointment key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        />);
    });
  };

  let appScript = (<Status message={"Loading"} />);
  const interviewers = getInterviewersForDay(state, state.day);

  /**
   * Check all data are loaded before rendering Appointment DOMs
   * @return
   */
  if (state["days"].length !== 0 && Object.keys(state["interviewers"]).length > 0 &&
    Object.keys(state["appointments"]).length > 0) {
      appScript = getRender();
  }

  return (
      <main className="layout">
        <section className="sidebar" >
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
          <Appointment key="last" time="1700 / 5pm" />
        </section>
      </main>
    );
}