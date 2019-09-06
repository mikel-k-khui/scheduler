import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import "components/Application.scss";

const queries = ['/api/days', '/api/appointments', '/api/interviewers'];
const SET_DAY = "SET_DAY";
// const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData(props) {

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        console.log(action.data);
        return Object.assign({}, state, { day: action.day });
      // case SET_APPLICATION_DATA:
      //   return { /* insert logic */ }
      // case SET_INTERVIEW: {
      //   return /* insert logic */
      // }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };
  

  const [ stateR, dispatch] = useReducer(reducer, { day: "Monday"});

  const [ state, setState] = useState({
    // day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDays = days => setState(prev => ({ ...prev, days}));
  const setAppointments = appointments => setState(prev => Object.assign({}, prev, { appointments }));
  const setInterviewer = interviewers => setState(prev => ({ ...prev, interviewers}));

  const setDay = day => dispatch({type: "SET_DAY", day});

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
          setDays(daysData.data);
          setAppointments(appsData.data);
          setInterviewer(intersData.data);
          // console.log("Days data:", daysData.data);
          console.log("Appointments data:", appsData.data);
          // console.log("Interviewer data:", intersData.data);

          }))
        .catch(e => console.log("error:", e));
    }, []);

  return { state, setDay, setDays, setAppointments, setInterviewer, bookInterview, cancelInterview, stateR, dispatch };
}