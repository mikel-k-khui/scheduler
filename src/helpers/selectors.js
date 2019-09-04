
/**
 * Render an array of appointments
 * @state {Object} All data in state pulled from API.
 * @day {String} currently seleted day
 * @return [Array]
 */
export function getAppointmentsForDay(state, day) {
  const matched = [];
  let appArray = state.days.filter(aDay =>  aDay.name === day)
  if (appArray.length > 0) {
    appArray = appArray[0]["appointments"]; 
    Object.keys(state.appointments).filter(app => {
      if (appArray.includes(state.appointments[app]["id"])) {
        matched.push(state.appointments[app]);
      }
      return matched;
    });
  }
  return matched;
}

/**
 * Render an array of appointments
 * @state {Object} All data in state pulled from API.
 * @seekInterview {Object} with student name and interviewer number
 * @return {Object} with interviewer information filled in
 */
export function getInterview(state, seekInterview) {
  let matched = null;
  if (seekInterview) {
    let interviewers = state["interviewers"];
    if (interviewers[seekInterview["interviewer"]]) {
        seekInterview["interviewer"] = interviewers[seekInterview["interviewer"]];
        matched = seekInterview;
      }
    }
  return matched;
}
