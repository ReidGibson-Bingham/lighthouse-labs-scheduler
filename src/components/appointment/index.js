
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

  console.log("## props", props);
  
  const { mode, transition, back } = useVisualMode(
    (props.interview ? SHOW : EMPTY)
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    props.bookInterview(props.id, interview);
    
    transition(SHOW);
    
  }

  

  return (
    <article className="Appointment"> 
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer}
          />
        )}
        {mode === CREATE && ( <Form student={props.student} interviewer ={props.interviewer} interviewers={props.interviewers} onSave={save}  onCancel={() => back() } 
       /> )} 
    </article>
  );
}

// All <Appointment> components will render a <Header> that takes in a time prop.
// If props.interview (an interview object) is truthy the <Appointment> will render the <Show> component, else it should render the <Empty> component.