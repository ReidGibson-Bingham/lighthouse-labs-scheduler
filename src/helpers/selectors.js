// import { NULL } from "node-sass";

export function getAppointmentsForDay(state, day) {

  const selectedDay = state.days.find(findDay => day === findDay.name );
  if (!selectedDay) {
    return [];
  }
  
  const appointments = selectedDay.appointments.map( appointmentID => state.appointments[appointmentID]);

  return appointments;
    
  //... returns an array of appointments for that day
}

export function getInterview(state, interview) {
  // let index = 0;
  // const selectedInterview = state.interviewers[index].find(findInterviewer => interview === findInterviewer.interviewers.id );
  // if (!selectedInterview) {
  //   return [];
  // }
  // const interviews = selectedInterview;
  if (!interview) {
    return null;
  }

  return { student: interview.student , interviewer: state.interviewers[interview.interviewer] };

}

// The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null. The object it returns should look like this:

// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }


export function getInterviewersForDay(state, day) {

  const findDay = state.days.find(element => day === element.name);

  if (!findDay) {
    return [];
  }

  const map = findDay.interviewers.map(id => state.interviewers[id]);

  return map;  
    
}