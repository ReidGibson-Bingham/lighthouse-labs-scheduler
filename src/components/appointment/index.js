
import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { Fragment } from "react";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import { create } from "react-test-renderer";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment (props) {
  
  const { mode, transition, back } = useVisualMode(
    (props.interview ? SHOW : EMPTY)
  );

  // console.log("props.interview.student", props.interview.student);

  // The same logic as before determines the initial mode. When props.interview contains a value, then we want to pass useVisualMode the SHOW mode, if it is empty then we should pass EMPTY.
  // const timeCheck = function () {
  //   if (!props.time){
  //     return "No appointments";
  //   } else {
  //     return `Appointment at ${props.time}`
  //   }
  // }

  // const displayShow = function () {
  //   if (props.interview){
  //     <Show
  //       student={props.interview.student}
  //       interviewer={props.interview.interviewer}
  //     />
  //   } else {
  //     emptyCheck();
  //   }
  // }

  // console.log("props", props);
  // const emptyCheck = function () {
  //   if (props.time[0] < 5) {
  //     return <Empty></Empty>
  //   } 
  // }
  // console.log("props.time: ", props.time[0]);

  // v this is a child of the bookInterview function in application // it needs to be passed to the form component
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
  }

  
  return (
    <article className="Appointment"> 
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && ( <Form student={props.student} interviewer ={props.interviewer} interviewers={[]} onSave={save}  onCancel={() => back() } 
       /> )} 
      {/* {props.interview ? (
        <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        />
      ) : <Empty /> }  */}
      {/* empty isn't supposed to be included past 5pm */}
    </article>
  );
}

// All <Appointment> components will render a <Header> that takes in a time prop.
// If props.interview (an interview object) is truthy the <Appointment> will render the <Show> component, else it should render the <Empty> component.