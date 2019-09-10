
export default function reducer(state, {type, ...payload}) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_SPOTS = "SET_SPOTS";
  
  // console.log("In Reducer: adding", payload, "to", state);
  switch (type) {
    case SET_DAY:
      return Object.assign({}, state, { day: payload.day});
    case SET_APPLICATION_DATA:
        let { ...any} = payload;
        return Object.assign({}, state, { ...any});
    case SET_SPOTS: 
      let { id, change} = payload;
      // console.log("In set spots:", id, "and change:", change);
      // console.log("Which day to change:", state.days[Math.floor(id / 5)]);

      const pos = Math.floor(id / 5);
      let days = [...state["days"]];
      let day = {...days[pos]};
      if (day["appointments"].includes(id)) {
        const newSpots = Number(days[pos]["spots"]) + Number(change);
        day = {...day, spots: newSpots};
        days = [...days.slice(0, pos), day, ...days.slice(pos+1, days.length)];
        // console.log("Target change", days, "\nand", day, newSpots);
      }
      return Object.assign({}, state, { days });

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${type}`
      );
  }
};