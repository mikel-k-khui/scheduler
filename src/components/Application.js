import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
// import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "8am",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "1:30am",
    interview: {
      student: "Wanda Maximoffe",
      interviewer: {
        id: 2,
        name: "Doctor Stephen Strange",
        avatar: "https://pbs.twimg.com/profile_images/687990268268773376/ZxsrfCpr_400x400.png"
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "5pm",
    interview: {
      student: "Sam Wilson",
      interviewer: {
        id: 3,
        name: "Steve Rogers",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 6,
    time: "6pm",
  }
];

const appScript = appointments.map(app => {
  return <Appointment key={app.id} {...app} />
});

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([{id: 1,
        name: "Monday",
        spots: 2,
      }]);
  
  useEffect(() => {
    console.log("Before get:");
    axios
      .get('/api/days')
      .then(res => {
        console.log("After get:", res.data);
        setDays(res.data);
      })
      .catch(e => console.log("error", e));
  }, []);

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
          days={days}
          value={day}
          setDay={setDay}
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
