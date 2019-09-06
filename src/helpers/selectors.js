
/**
 * Render an array of appointments
 * @state {Object} All data in state pulled from API.
 * @day {String} currently seleted day
 * @return [Array]
 */
export function getAppointmentsForDay(state, day) {
  const matched = [];
  let appArray = state.days.filter(aDay =>  aDay.name === day);
  if (appArray.length > 0) {
    console.log("appArray", appArray);
    Object.keys(state.appointments).filter(app => {
      if (appArray.includes(state.appointments[app]["id"])) {
        matched.push(state.appointments[app]);
      }
      return matched;
    });
  }
  console.log(matched, "for", day);
  return matched;
}

/**
 * Render an array of appointments
 * @state {Object} All data in state pulled from API.
 * @seekInterview {Object} with student name and interviewer number
 * @return {Object} with interview data information filled in
 */
export function getInterview(state, seekInterview) {
  let matched = {};
  console.log("Before selector:", state, seekInterview);
  if (seekInterview) {
    if (state["interviewers"][seekInterview["interviewer"]]) {
        matched = {...seekInterview};
        matched["interviewer"]= state["interviewers"][seekInterview["interviewer"]];
      }
    }
    console.log("In selector:", matched)
  return matched;
}

/**
 * Render an array of interviewers available
 * @state {Object} All data in state pulled from API.
 * @day {String} currently seleted day
 * @return [Array]
 */
export function getInterviewersForDay(state, day) {
  const matched = [];

  let appArray = state.days.filter(aDay =>  aDay.name === day);

  if (appArray.length > 0) {
    appArray = appArray[0]["interviewers"];
    Object.keys(state["interviewers"]).filter(interviewer => {
      if (appArray.includes(state["interviewers"][interviewer]["id"])) {
        matched.push(state["interviewers"][interviewer]);
      }
      return matched;
    });
  }
  return matched;
}