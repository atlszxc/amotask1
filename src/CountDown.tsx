import { useState, useEffect, useMemo } from "react";
import { hourToString } from "./const";
import { getNoun } from "./utils";

type CountDownProp = {
    hours: number,
    minutes: number,
    seconds: number
}

const secNoun = ['секунда', 'секунды', 'секунд']
const minNoun = ['минута', 'минуты', 'минут']
const hourNoun = ['час', 'часа', 'часов']

const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }: CountDownProp) => {
    const [paused, setPaused] = useState<boolean>(false);
    const [over, setOver] = useState<boolean>(false);
    const [[h, m, s], setTime] = useState<number[]>([hours, minutes, seconds]);
  
    const tick = () => {
      if (paused || over) return;
  
      if (h === 0 && m === 0 && s === 0) {
        setOver(true);
      } else if (m === 0 && s === 0) {
        setTime([h - 1, 59, 59]);
      } else if (s === 0) {
        setTime([h, m - 1, 59]);
      } else {
        setTime([h, m, s - 1]);
      }
    };
  
    const reset = () => {
      setTime([hours, minutes, seconds]);
      setPaused(false);
      setOver(false);
    };
  
    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });

    const parse = useMemo(() => 
        [
            hourToString[h] + ' ' + getNoun(Number(h), hourNoun[0], hourNoun[1], hourNoun[2]), 
            m + ' ' + getNoun(Number(m), minNoun[0], minNoun[1], minNoun[2]), 
            s + ' ' + getNoun(Number(s), secNoun[0], secNoun[1], secNoun[2])
        ].join(', '), 
        [h, m, s]
    )
  
    return (
      <div>
        <p>{ parse }</p>
        <div>{over ? "Time's up!" : ''}</div>
        <button onClick={() => setPaused(!paused)}>
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={() => reset()}>Restart</button>
      </div>
    );
  };

  export default CountDown