import React from "react";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";


export default function InterviewerList(props) {
    
  const items = props.interviewers.map(interviewer => {

    // InterviewerList.propTypes = {
    //   value: PropTypes.number,
    //   onChange: PropTypes.func.isRequired
    // };
  
    return (
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer === props.value}
      setInterviewer={(event) => props.onChange(interviewer)}
    />
    );
  });

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
    {items}
    </ul>
    </section>
    );
}