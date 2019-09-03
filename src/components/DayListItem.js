import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--full': props.spots === 0,
    'day-list__item--selected' : props.selected
  });

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{props.spots} spots remaining</h3>
    </li>
  );
}