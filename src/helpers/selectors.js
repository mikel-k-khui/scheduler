
export function getAppointmentsForDay(state, day) {
  const matched = [];
  let appArray = state.days.filter(aDay =>  aDay.name === day)
  if (appArray.length > 0) {
    appArray = appArray[0]["appointments"]; 
    Object.keys(state.appointments).filter(app => {
      if (appArray.includes(state.appointments[app]["id"])) {
        matched.push(state.appointments[app]);
      }
    });
  }
  return matched;
}
