import { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

const queries = ['/api/days', '/api/appointments', '/api/interviewers'];

export default function useApplicationData(props) {
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

    //Add an interview to update Database
    function bookInterview(id, interview) {
      const appointment = {...state.appointments[id], interview: { ...interview }};
      const appointments = {...state.appointments,[id]: appointment};
  
      return axios
        .put(`http://localhost:8001/api/appointments/${id}`, {"interview": interview} )
        .then(res => {
          setAppointments(appointments);
          return Promise.resolve("SHOW"); 
        })
        .catch(e => "ERROR_SAVE");
    }
      //Cancel an interview to update Database
      function cancelInterview(id) {
        const appointment = {...state.appointments[id], interview: null };
        const appointments = {...state.appointments,[id]: appointment};
    
        return axios
          .delete(`http://localhost:8001/api/appointments/${id}`, {"interview": null} )
          .then(res => {
            setAppointments(appointments);
            return Promise.resolve("EMPTY"); 
          })
          .catch(e => "ERROR_DELETE");
      }

    //initial setup of in-memory data
    useEffect(() => {
      axios.all(queries.map(endPoint => axios.get(endPoint)))
        .then(axios.spread(function (daysData, appsData, intersData) {
          // console.log("Days data:", daysData.data);
          console.log("Appointments data:", appsData.data);
          // console.log("Interviewer data:", intersData.data);
          setDays(daysData.data);
          setAppointments(appsData.data);
          setInterviewer(intersData.data);
          }))
        .catch(e => console.log("error:", e));
    }, []);

  return { state, setDay, setDays, setAppointments, setInterviewer, bookInterview, cancelInterview };
}