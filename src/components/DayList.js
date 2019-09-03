import React from "react";
// import classNames from "classnames";

import DayListItem from "components/DayListItem";

/**
 * Render a list of DayListItem for the day
 * @days {Array} list of day objects (id, name and spots).
 * @day {String} currently seleted day
 * @setDay {Function} accepts the name of the day.
 * @return {}
 */
export default function DayList(props) {
  const items = props.days.map(day => {
    return (
    <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
    );
  });

  return (
    <ul>
      {items}
    </ul>
  );
}

