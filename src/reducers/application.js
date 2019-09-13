export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_SPOTS = "SET_SPOTS";

export default function reducer(state, {type, ...payload}) {
  
  switch (type) {
    case SET_DAY:
      return Object.assign({}, state, { day: payload.day});
    case SET_APPLICATION_DATA:
        let { ...any} = payload;
        return Object.assign({}, state, { ...any});
    case SET_SPOTS: 
      let { id, change} = payload;
      // const dayOf = Math.floor(id / 5);
      const dayOf = state.days.filter(day => day["appointments"].includes(id))[0]["id"] - 1;
      let days = [...state["days"]];
      let day = {...days[dayOf]};

      if (day["appointments"].includes(id)) {
        const newSpots = Number(days[dayOf]["spots"]) + Number(change);
        day = {...day, spots: newSpots};
        days = [...days.slice(0, dayOf), day, ...days.slice(dayOf+1, days.length)];
      }
    return Object.assign({}, state, { days });

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${type}`
      );
  }
};