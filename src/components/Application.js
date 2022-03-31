import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { Fragment } from "react";
import "components/appointment";
import Appointment from "components/appointment";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {

  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentList = dailyAppointments.map( appointment => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png"alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        <Fragment>
          {appointmentList}
          <Appointment key="last" time="5pm"/>
        </Fragment>
      
      </section>
    </main>
  );
}
