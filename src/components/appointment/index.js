
import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import { Fragment } from "react";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import { create } from "react-test-renderer";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment (props) {

  
  
  const { mode, transition, back } = useVisualMode(
    (props.interview ? SHOW : EMPTY)
  );

  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };

    console.log("props.id", props.id);

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then( () => {
      transition(SHOW);
    });
    
  }

  function confirmCheck() {
    transition(CONFIRM);
  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then ( () => {
      transition(EMPTY);
    })
    
  }

  return (
    <article className="Appointment"> 
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer && props.interview.interviewer.name}
            onDelete={confirmCheck}
          />
        )}
        {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => back()} onConfirm={deleteInterview}   />}
        {mode === SAVING && <Status message={"Saving"}/>}
        {mode === DELETING && <Status message={"Deleting"}/>}
        {mode === CREATE && ( <Form student={props.student} interviewer ={props.interviewer} interviewers={props.interviewers} onSave={save}  onCancel={() => back() } 
       /> )} 
    </article>
  );
}

// All <Appointment> components will render a <Header> that takes in a time prop.
// If props.interview (an interview object) is truthy the <Appointment> will render the <Show> component, else it should render the <Empty> component.