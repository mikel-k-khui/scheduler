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
      const pos = Math.floor(id / 5);
      let days = [...state["days"]];
      let day = {...days[pos]};

      if (day["appointments"].includes(id)) {
        const newSpots = Number(days[pos]["spots"]) + Number(change);
        day = {...day, spots: newSpots};
        days = [...days.slice(0, pos), day, ...days.slice(pos+1, days.length)];
      }
    return Object.assign({}, state, { days });

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${type}`
      );
  }
};