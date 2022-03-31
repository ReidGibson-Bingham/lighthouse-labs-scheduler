import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

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

