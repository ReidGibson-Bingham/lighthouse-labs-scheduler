import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  
  const dayListItems = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
        // setDay={props.setDay}
      />
    )
    
  });

  // const players = props.playerData.map(player => {
  //   return (
  //   <Player
  //     key={player.gamerTag}
  //     gamerTag={player.gamerTag} 
  //     firstName={player.firstName} 
  //     lastName={player.lastName} 
  //     wins={player.wins} />)
  // });

  return (
    <ul className="Daylist">
      {dayListItems}
      {/* <DayListItem 
        key={props.days[0].id}
        name={props.days[0].name} 
        spots={props.days[0].spots} 
        selected={props.days[0].name === props.day}
        setDay={props.setDay}  
      />
      <DayListItem
        key={props.days[1].id} 
        name={props.days[1].name} 
        spots={props.days[1].spots} 
        selected={props.days[1].name === props.day}
        setDay={props.setDay}  
      />
      <DayListItem 
        key={props.days[2].id}
        name={props.days[2].name}
        spots={props.days[2].spots} 
        selected={props.days[2].name === props.day}
        setDay={props.setDay}  
      />       */}
    </ul>
  )
}