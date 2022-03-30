import React from "react";
import "components/InterviewerList.scss";
// import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  
  const modifiedInterviewers = Object.values(props.interviewers);
  

  const interviewerListItems = modifiedInterviewers.map((interviewer) => {
    // console.log("interviewer.key", interviewer.key);
    // console.log("props.id:", props.id);
    // console.log("77 interviewer", interviewer);
    return (
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.value}
          // selected={interviewer.id === props.interviewer}
          // setInterviewer={() => props.setInterviewer(interviewer.id)}
          setInterviewer={() => props.onChange(interviewer.id)} 
        />
      );
  });
  
  // const InterviewerListItems = props.

  return (

    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {interviewerListItems}
    </ul>
    </section>
  );
};

