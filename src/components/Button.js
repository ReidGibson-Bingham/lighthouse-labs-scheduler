import React from "react";

import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   const buttonClass = classNames("button", {
      // if (props.confirm) {
      //    buttonClass += " button--confirm";
      //  }
     "button--confirm": props.confirm,
      // if (props.danger) {
      //   buttonClass += " button--danger";
      // }
     "button--danger": props.danger
   });
   
  
    
 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }


// Refactor the Button component so that it uses the classnames library to create a buttonClass string.

// Note
// Use the boolean values contained in props in an object you pass to classNames to conditionally add classes.

// Change the Button component in the src/components/Button.js file to render a button element. It should use the props.children value as the button text