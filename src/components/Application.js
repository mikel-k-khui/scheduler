import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
// import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
// import { resolve } from "url";

const queries = ['/api/days', '/api/appointments', '/api/interviewers'];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState(prev => Object.assign({}, prev, { day }));
  const setDays = days => setState(prev => ({ ...prev, days}));
  const setAppointments = appointments => setState(prev => Object.assign({}, prev, { appointments }));
  const setInterviewer = interviewers => setState(prev => ({ ...prev, interviewers}));
  let appScript = '';

  //Book interview to update Database
  function bookInterview(id, interview) {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments,[id]: appointment};

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {"interview": interview} )
      .then(res => {
        setAppointments(appointments);
        return Promise.resolve("SHOW"); 
      })
      .catch(e => console.log("Error:", e));
  }
  
  useEffect(() => {
    axios.all(queries.map(endPoint => axios.get(endPoint)))
      .then(axios.spread(function (daysData, appsData, intersData) {
        // console.log("Days data:", daysData.data);
        // console.log("Appointments data:", appsData.data);
        // console.log("Interviewer data:", intersData.data);
        setDays(daysData.data);
        setAppointments(appsData.data);
        setInterviewer(intersData.data);
        }))
      .catch(e => console.log("error:", e));
  }, []);

  appScript = getAppointmentsForDay(state, state.day).map(appointment => {
    return (<Appointment key={appointment.id} interviewers={getInterviewersForDay(state, state.day)} bookInterview={bookInterview} {...appointment} />);
  });

  useEffect(() => {
    appScript = getAppointmentsForDay(state, state.day).map(appointment => {
      return (<Appointment key={appointment.id} interviewers={getInterviewersForDay(state, state.day)} bookInterview={bookInterview} {...appointment} />);
    });
    console.log("State updated");
  }, [state]);

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
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}
