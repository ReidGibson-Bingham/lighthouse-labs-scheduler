import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
 
  const transition = function (newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      history.push(initial);  
    }
    history.push(newMode);
  };

  const back = function () {
    history.pop();
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
    }    
  }

  return { mode, transition, back};
}
