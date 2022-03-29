import { useState } from "react";

// my function v
// export default function useVisualMode(initialMode) {
//   const [state, setState] = useState(initialMode);
//   return {mode: setState()};
// }
// lighthouse function v
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // console.log("this is history", history);
  // console.log("last item in history:", history[history.length - 1]);

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




// This custom Hook will need to add the transition property to the object that useVisualMode returns. The property will point to a function that we implement directly in the custom Hook. Reveal the code below to see an example of this pattern.