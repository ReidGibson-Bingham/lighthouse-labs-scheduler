// import React, { useState, Fragment } from 'react';
import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  // console.log("props:", props);
  
  const formatSpots = function () {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }
  }
  const dayClass = classNames("day-list__item", {
    // if (props.confirm) {
    //    buttonClass += " button--confirm";
    //  }
   "day-list__item--selected": props.selected,
    // if (props.danger) {
    //   buttonClass += " button--danger";
    // }
   "day-list__item--full": !props.spots
 });
  
  // console.log("value of props.spots: ", props.spots);
  // console.log("value of props.selected", props.selected);
  // console.log("DayListItem: ", DayListItem);
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name) }>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light"> {formatSpots()}</h3>
    </li>
  );
}


// export default function Button(props) {
//   const buttonClass = classNames("button", {
//      // if (props.confirm) {
//      //    buttonClass += " button--confirm";
//      //  }
//     "button--confirm": props.confirm,
//      // if (props.danger) {
//      //   buttonClass += " button--danger";
//      // }
//     "button--danger": props.danger
//   });
  
 
   

//   return (
//     <button
//       className={buttonClass}
//       onClick={props.onClick}
//       disabled={props.disabled}
//     >
//       {props.children}
//     </button>
//   );
// }