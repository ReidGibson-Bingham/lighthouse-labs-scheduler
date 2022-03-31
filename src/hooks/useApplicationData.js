import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //////////////////////////////////////////////////////////
  function updateSpots (state, operation) {
    const selectedDay = state.day;
    const days = state.days;
    let currentDay = null;
    for (const index in days) {
      currentDay = days[index];
      if (days[index].name === selectedDay){
        break;
      }
    }
    if (operation === 'add') {
      currentDay.spots ++;
    } 
    if (operation === 'subtract') {
      currentDay.spots --;
    }
  }
  /////////////////////////////////////////////////////////////

  const setDay = day => setState({ ...state, day });

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

    return axios
      .put(url, {interview})
      .then ((res) => {

        //setting the state for spots////////
        updateSpots(state, 'subtract');
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

        //setting the state for spots////////
        updateSpots(state, 'add');
        /////////////////////////////////////

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

