import { useEffect, useReducer } from "react";
import axios from "axios";

import "components/Application.scss";

const queries = ['/api/days', '/api/appointments', '/api/interviewers'];
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_SPOTS = "SET_SPOTS";

export default function useApplicationData(props) {

  function reducer(state, action) {
    console.log("In Reducer", action);
    switch (action.type) {
      case SET_DAY:
        return Object.assign({}, state, { day: action.day });
      case SET_APPLICATION_DATA:
          let { type, ...any} = action;
          return Object.assign({}, state, { ...any});
      case SET_SPOTS: 
        let { id, change} = action;
        // console.log("In set spots:", id, "and change:", change);
        // console.log("Which day to change:", state.days[Math.floor(id / 5)]);

        const pos = Math.floor(id / 5);
        // slice(0, pos);
        // slice(pos + 1, .length);
        let days = [...state["days"]];
        let day = {...days[pos]};
        const newSpots = Number(days[pos]["spots"]) + Number(change);
        day = {...day, spots: newSpots};

        days = [...days.slice(0, pos), day, ...days.slice(pos+1, days.length)]; 

        console.log("Target change", days, "and", day, newSpots);

        return Object.assign({}, state, { days});

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };
  
  const [ state, dispatch] = useReducer(reducer, { 
    day: "Monday", days: [], appointments: {}, interviewers: {}
    });

  const setDay = day => dispatch({type: "SET_DAY", day});
  const setDays = days => dispatch({type: "SET_APPLICATION_DATA", days});
  const setAppointments = appointments => dispatch({type: "SET_APPLICATION_DATA", appointments});
  const setInterviewer = interviewers => dispatch({type: "SET_APPLICATION_DATA", interviewers});
  const setSpots = (id, change) =>  dispatch({type: "SET_SPOTS", id, change});

  //Add an interview to update Database
  function bookInterview(id, interview) {
    const change = (state.appointments[id]["interview"] === null ? -1 : 0);

    console.log("Check if null", interview, "to add->", id, "to", state.appointments, "for", change);

    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment};

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {"interview": interview} )
      .then(res => {
        setAppointments(appointments);
        setSpots( id, change);
        return Promise.resolve("SHOW"); 
      })
      .catch(e => "ERROR_SAVE");
  }
    //Cancel an interview to update Database
    function cancelInterview(id) {
      const appointment = {...state.appointments[id], interview: null };
      const appointments = {...state.appointments, [id]: appointment};
  
      return axios
        .delete(`http://localhost:8001/api/appointments/${id}`, {"interview": null} )
        .then(res => {
          setAppointments(appointments);
          setSpots( id, 1);
          return Promise.resolve("EMPTY"); 
        })
        .catch(e => "ERROR_DELETE");
    }

    //initial setup of in-memory data
    useEffect(() => {
      axios.all(queries.map(endPoint => axios.get(endPoint)))
        .then(function ([daysData, appsData, intersData]) {
          setDays(daysData.data);
          setAppointments(appsData.data);
          setInterviewer(intersData.data);

          // console.log("Days data:", daysData.data);
          // console.log("Appointments data:", appsData.data);
          // console.log("Interviewer data:", intersData.data);
          })
        .catch(e => console.log("error:", e));
    }, []);

  return { state, setDay, setDays, setAppointments, setInterviewer, bookInterview, cancelInterview, dispatch };
}