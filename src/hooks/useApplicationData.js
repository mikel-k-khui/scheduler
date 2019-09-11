import { useEffect, useReducer } from "react";
import axios from "axios";

import "components/Application.scss";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_SPOTS } from "reducers/application";
const queries = ['/api/days', '/api/appointments', '/api/interviewers'];

export default function useApplicationData(props) {
  
  const [ state, dispatch] = useReducer(reducer, { 
    day: "Monday", days: [], appointments: {}, interviewers: {}
    });

  const setDay = day => dispatch({type: SET_DAY, day});
  const setDays = days => dispatch({type: SET_APPLICATION_DATA, days});
  const setAppointments = appointments => dispatch({type: SET_APPLICATION_DATA, appointments});
  const setInterviewer = interviewers => dispatch({type: SET_APPLICATION_DATA, interviewers});
  const setSpots = (id, change) =>  dispatch({type: SET_SPOTS, id, change});

  /**
   * Add an interview to update Database
   * @id {number} appointment id
   * @interview {Object} student name with an interviewer id
   * @return {Promise}
   */
  function bookInterview(id, interview) {
    //check if the interview exists in state to ascertain add vs. edit
    const change = (state.appointments[id]["interview"] === null ? -1 : 0);
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment};

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {"interview": interview } )
      .then(res => {
        setAppointments(appointments);
        setSpots( id, change);
        return Promise.resolve("SHOW"); 
      })
      .catch(e => "ERROR_SAVE");
  }

  /**
   * Cancel an interview to update Database
   * @id {number} appointment id
   * @return {Promise}
   */
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

    /**
   * Set a delay for the loading page - only for dev. demo of loading page
   * @id {number} appointment id
   * @return {Promise}
   */
  function delay(time, value) {
    return new Promise(function(resolve) { 
        setTimeout(() => resolve(value), time);
    });
  }
  /**
   * Initial setup of in-memory data
   * @return {}
   */
  useEffect(() => {
    axios.all(queries.map(endPoint => axios.get(endPoint)))
      .then(response => delay(1000, response))
      .then(function ([daysData, ...rest]) {
        setDays(daysData.data);
        return rest;
        })
      .then(response => delay(1000, response))
      .then(function ([appsData, intersData]) {
        setAppointments(appsData.data);
        setInterviewer(intersData.data);
        })
      .catch(e => console.log("error:", e));
  }, []);

  return { state, setDay, setDays, setAppointments, setInterviewer, bookInterview, cancelInterview, dispatch };
}