import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  console.log("** props :", props);

  const interviewerClass = classNames("interviewers__item", {
    // if (props.confirm) {
    //    buttonClass += " button--confirm";
    //  }
   "interviewers__item--selected": props.selected,
  
  });
  // this is my code
  // return (
  //   <li className={test} onClick={() => props.setInterviewer(props.id)}>
  //     <img
  //     className="interviewers__item-image"
  //     src={props.avatar}
  //     alt={props.name}
  //     />
  //     {props.selected && props.name}
  //   </li>
  // )
  // v lighthouses' code v
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
