import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);
  
  const transition = function (newMode, replace = false) {
  
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    }
    // i was getting errors with my history because there was no else statement, so sethistory was being called whenever replace was true
    else {
      setHistory(prev => [...prev, newMode]);
    }
  };

  const back = function () {
    
    if (history.length >= 2) {
      setHistory(prev => [...prev.slice(0, -1)])
    }    
  }

  return { mode: history[history.length - 1], transition, back};
}
