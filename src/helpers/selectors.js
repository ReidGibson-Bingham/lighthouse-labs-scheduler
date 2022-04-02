

export function getAppointmentsForDay(state, day) {

  const selectedDay = state.days.find(findDay => day === findDay.name );
  if (!selectedDay) {
    return [];
  }
  
  const appointments = selectedDay.appointments.map( appointmentID => state.appointments[appointmentID]);

  return appointments;
    
}

export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  return { student: interview.student , interviewer: state.interviewers[interview.interviewer] };

}

export function getInterviewersForDay(state, day) {

  const findDay = state.days.find(element => day === element.name);

  if (!findDay) {
    return [];
  }

  const map = findDay.interviewers.map(id => state.interviewers[id]);

  return map;  
    
}