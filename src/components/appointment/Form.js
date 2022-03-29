import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from 'react';


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = function () {
    setStudent("");
    setInterviewer(null);
  }
  const cancel = function () {
    reset(); // the cancel function calls the reset function
    props.onCancel();
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={props.student}
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
          
          />
        </form>
      <InterviewerList 
        student={student}
        interviewer={interviewer}
        interviewers={props.interviewers}
        onSave={props.onSave}
        onCancel={props.onCancel}
        
      />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}> Save</Button>
        </section>
      </section>
    </main>
  )
}

