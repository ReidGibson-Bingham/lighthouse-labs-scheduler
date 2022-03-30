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
    appointments: {}
  });

  let dailyAppointments = [];

  dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const setDay = day => setState({ ...state, day });



  const appointmentList = dailyAppointments.map( appointment => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={state.interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        // v prop spreading v
        // key={appointment.id} 
        // {...appointment}
      />
    )
  });
  // this will be passed to each appointment component as props
  function bookInterview(id, interview) {
    const url = `/api/appointments/${id}`

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    console.log("firing just before axios", appointment);
    
    return axios
      .put(url, {interview})
      .then ((res) => {
        console.log("^^ res ", res);

        setState({
          ...state,
          appointments
        });

      })
      .catch((err) => {
        console.log("^^ error", err);
      }) 
    
  }

  
  function cancelInterview(id) {
    const url = `/api/appointments/${id}`

    const appointment = {
      ...state.appointments[id],
      interview: null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    console.log("firing just before axios", appointment);
    
    return axios
      .delete(url)
      .then ((res) => {
        console.log("^^ res ", res);

        setState({
          ...state,
          appointments
        });

      })
      .catch((err) => {
        console.log("^^ error", err);
      }) 
    
  }

  

  const appointments = getAppointmentsForDay(state, state.day);

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
          <Appointment key="last" time="5pm" interviewers={state.interviewers} />
        </Fragment>
      
      </section>
    </main>
  );
}
