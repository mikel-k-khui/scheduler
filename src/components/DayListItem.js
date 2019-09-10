import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--full': props.spots === 0,
    'day-list__item--selected' : props.selected
  });
  const spots = formatSpots(props.spots);

  return (
    <li className={dayClass} onClick={props.setDay} data-testid="day" >
      <h2>{props.name}</h2>
      <h3>{spots}</h3>
    </li>
  );
}

const formatSpots = (spots) => {
  return spots === 0 ? 'no spots remaining' : 
    spots === 1 ? '1 spot remaining' : 
    `${spots} spots remaining`;
}
