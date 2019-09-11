import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

   /**
   * Create mode and replace mode
   * @newMode {String}
   * @replace {Boolean} - optional
   * @return {Array}
   */
  function transition(newMode, replace = false) {
    if (history[history.length - 1] !== newMode) {
      setHistory(() => {
        let newHistory = [...history, newMode];
        if (replace) {
          newHistory = history.slice(0, history.length - 1);
          newHistory = [...newHistory, newMode];
        }
        setMode(newMode);
        return newHistory;
      });
    }
  };

   /**
   * Copy history, pop the last item and replace history immutably
   * @return {Array}
   */
  function back() {
    setHistory(() => {
      let past = history.slice();
      if (history.length > 1) {
        past = history.slice(0, history.length - 1);
      }
      setMode(past[past.length - 1]);
      return past;
    });
  };

  return { mode, transition, back };
}