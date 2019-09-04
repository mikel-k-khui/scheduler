import React, { useEffect, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(step, replace = false) {
    setHistory(() => {
      let newHistory = [...history, step];
      if (replace) {
        newHistory = history.slice(0, history.length - 1);
        newHistory = [...newHistory, step];
      }
      return newHistory;
    });
    setMode(step);
    // console.log("In:", step, "transition:", history);
  };
q
  function back() {
    setHistory(() => {
      let past = history.slice();
      if (history.length > 1) {
        past = history.slice(0, history.length - 1);
      }
      setMode(past[past.length - 1]);
      console.log("History:", history, "past:", past, "and mode:", mode);
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

  console.log("Out, history:", history, "and mode:", mode);

  return { mode, transition, back, transition };
}