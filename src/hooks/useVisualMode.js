import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (history[history.length - 1] !== newMode) {
      setHistory(() => {
        let newHistory = [...history, newMode];
        if (replace) {
          newHistory = history.slice(0, history.length - 1);
          newHistory = [...newHistory, newMode];
          console.log("Replaced with", newHistory);
        }
        setMode(newMode);
        console.log("transition using", newHistory);
        return newHistory;
      });
    }
  };

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
  };

  return { mode, transition, back };
}