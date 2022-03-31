
import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
// import { create } from "react-test-renderer";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {
  
  const { mode, transition, back } = useVisualMode(
    (props.interview ? SHOW : EMPTY)
  );

  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then( (res) => {
        transition(SHOW);
    })
    .catch( (err) => {
      console.log("save error: ", err);
      transition(ERROR_SAVE, true);
    }); // the catches are only in this file, not where we make the axios requests (useApplicationData.js)
  }
  
  function deleteInterview() {

    transition(DELETING, true);

    props.cancelInterview(props.id)
    .then ( (res) => {
      transition(EMPTY);
    })
    .catch( (err) => {
      console.log("delete error: ", err);
      transition(ERROR_DELETE, true);
    }) // the catches are only in this file, not where we make the axios requests (useApplicationData.js)
  }

  function confirmCheck() {
    transition(CONFIRM);
  }

  function editFunction () {
    transition(EDIT);
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
            onEdit={editFunction}
          />
        )}
        {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={() => back()} />}
        {mode === ERROR_DELETE && <Error message={"Could not delete appointment"} onClose={() => back()} />}
        {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => back()} onConfirm={deleteInterview}   />}
        {mode === SAVING && <Status message={"Saving"}/>}
        {mode === DELETING && <Status message={"Deleting"}/>}
        {mode === CREATE && ( <Form student={props.student} interviewer ={props.interviewer} interviewers={props.interviewers} onSave={save}  onCancel={() => back() } 
        /> )}
        {mode === EDIT && ( <Form student={props.interview.student} interviewer ={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save}  onCancel={() => back() } 
        /> )} 
    </article>
  );
}

// All <Appointment> components will render a <Header> that takes in a time prop.
// If props.interview (an interview object) is truthy the <Appointment> will render the <Show> component, else it should render the <Empty> component.