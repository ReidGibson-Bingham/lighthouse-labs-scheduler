import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function updateSpots (state) {
    const selectedDay = state.day;
    const days = state.days;
    console.log("selected day:", selectedDay);
    console.log("days:", days);
    let currentDay = null;
    for (const index in days) {
      currentDay = days[index];
      
      if (days[index].name === selectedDay){
        break;
      }
    }
    console.log("appointments for currentDay: ", currentDay.appointments);

    const appointmentIDs = currentDay.appointments;
    console.log("STate.appointments: ", state.appointments);

    for (const index in state.appointments) {
      for (let i = 0; i < currentDay.appointments.length; i++){
        if (state.appointments.id === currentDay.appointments[i]) {
          console.log("found it:" );
        }
      }
      
      // check if the appointment has an id that exists in my day's id's
    }
    // state.days.selectedDay

    //how will i check for the correct appointments in a day
    // the correct appointments are the appointments for the current day
    // i'll have to get the appointment id's from the state.days. state.days.appointments.id
    //i will check the appointments to see if interview is null

    // return how many spots there are in a day
  }

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {

    //finding the spots/////////////////////////
    // const spread1 = {...state.days};
    // const spread2 = {...spread1[id]};
    // let spots = spread2.spots
    // console.log(`spots for ${spread1} day: `, spots);
    ////////////////////////////////////////////

    const url = `/api/appointments/${id}`

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // console.log("firing just before axios", appointment);
    
    return axios
      .put(url, {interview})
      .then ((res) => {
        // console.log("^^ res ", res);

        //setting the state for spots////////
        // setState(spread2, spots);
        updateSpots(state);
        /////////////////////////////////////

        setState({
          ...state,
          appointments
        });

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
    
    return axios
      .delete(url)
      .then ((res) => {
        console.log("^^ res ", res);

        setState({
          ...state,
          appointments
        });

      })

  }

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

  return {
    state: state,
    setDay: setDay,
    cancelInterview: cancelInterview,
    bookInterview: bookInterview
  }

}

