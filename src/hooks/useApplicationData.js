import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const checkInterviewStatus = function (day, appointments) {
    let count = 0;
    for (const appointment of day.appointments) {
      if (appointments[appointment]["interview"] === null) {
        count ++;
      }
    }
    return count;
  }

  const updateSpots = function (days, appointments) {
    const spots = days.map((day) => {
      return {...day, spots: checkInterviewStatus(day, appointments)}
    })
    return spots;
  }

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

    const days = updateSpots(state.days, appointments);

    return axios
      .put(url, {interview})
      .then ((res) => {

        setState({
          ...state,
          appointments, 
          days

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

    const days = updateSpots(state.days, appointments);
    
    return axios
      .delete(url)
      .then ((res) => {
        console.log("^^ res ", res);

        setState({
          ...state,
          appointments, 
          days

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

