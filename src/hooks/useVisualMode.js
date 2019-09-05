import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(step, replace = false) {
    if (history[history.length - 1] !== step) {
      setHistory(() => {
        let newHistory = [...history, step];
        if (replace) {
          newHistory = history.slice(0, history.length - 1);
          newHistory = [...newHistory, step];
          console.log("Replaced", newHistory);
        }
        setMode(step);
        console.log("transition", newHistory);
        return newHistory;
      });
    }
  };
  // console.log("After transition", mode, "to", history[history.length - 1]);

  function back() {
    setHistory(() => {
      let past = history.slice();
      if (history.length > 1) {
        past = history.slice(0, history.length - 1);
      }
      setMode(past[past.length - 1]);
      console.log("back");
      return past;
    });
    // if (history.length > 1) {
    //   let past = history.slice(0, history.length - 1);
    //   setHistory(past => {
    //     setMode(history[history.length - 1]);
    //     console.log("here:", history, "and", mode);
    //     return past;
    //   });
    //   console.log("Inside:", history, "and", mode);
    // }
  };

  return { mode, transition, back };
}