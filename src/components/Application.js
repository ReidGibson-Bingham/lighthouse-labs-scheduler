import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import { useState, Fragment, useEffect } from "react";
import axios from 'axios';

import "components/appointment";
import Appointment from "components/appointment";
import Header from "./appointment/Header";
import Show from "./appointment/Show";
import Empty from "./appointment/Empty";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";


export default function Application(props) {
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // v this is in place of the hardcoded appointments obj
    appointments: {}
  });

  let dailyAppointments = [];

  dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const setDay = day => setState({ ...state, day });

// v new & improved, uses dailyAppointments array instead of Object.values

  const appointmentList = dailyAppointments.map( appointment => {
    console.log("appointment.interview: ", appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
        bookInterview={bookInterview}
        // v prop spreading v
        // key={appointment.id} 
        // {...appointment}
      />
    )
  });
  // this will be passed to each appointment component as props
  function bookInterview(id, interview) {
    console.log("this is bookInterview: ", id, interview);
  }

  // day is not defined v, so i'm using state.day. the page isn't loading though...
  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
        />
      );
  });


  // v newer version of useEffect, because We can't list our appointments until we download the days data, followed by the appointments data. We are going to make a request to both endpoints at the same time
  useEffect(() => {
    const daysURL = 'http://localhost:8001/api/days';
    const appointmentsURL = 'http://localhost:8001/api/appointments';
    const interviewersURL = 'http://localhost:8001/api/interviewers';
    Promise.all([  
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);


  // v this code will be implemented once we've created our getInterview selector function v

  

  
  console.log("value of state.interviewers: ", state.interviewers);
  
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
          <Appointment key="last" time="5pm" />
        </Fragment>
      
      </section>
    </main>
  );
}
