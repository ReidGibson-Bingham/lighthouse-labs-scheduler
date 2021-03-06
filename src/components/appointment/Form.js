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
    reset(); 
    props.onCancel();
  }

  const [error, setError] = useState("");

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } // shows an error if no name is given
    if (!interviewer) {
      setError("must select an interviewer");
      return; 
    } // shows an error if no interviewer is selected
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
          />
          
        </form>
      <section className="appointment__validation"> {error}</section>
      <InterviewerList 
        value={interviewer}
        interviewers={props.interviewers}
        onChange={setInterviewer}
        
      />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => validate()} > Save</Button>
        </section>
      </section>
    </main>
  )
}

