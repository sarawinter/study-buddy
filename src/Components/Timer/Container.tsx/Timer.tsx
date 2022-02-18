import React, { useCallback, useEffect, useRef, useState } from "react";
import Pling from "../../../Assets/Audio/SynthChime10.mp3";
import { EMyEnum, TimerProps } from "../Models/Models";
import styles from "./Timer.module.css";

// interface Props {
//   timerArgs: number[];
//   someFunc: (str: string) => void;
// }

function Timer({ timerArgs, myEnumType }: TimerProps) {
  const one = EMyEnum.ONE;
  // const timeList = timerArgs;
  const timeList = [0.2, 0.3, 20, 5, 10];
  const [timeString, setTimeString] = useState("");
  const [fullTimeString, setFullTimeString] = useState("");
  const [totes, setTotes] = useState(timeList[0]);
  const [timeListIndex, setTimeListIndex] = useState(-1);
  const [timerWidth, setTimerWidth] = useState(0);

  const sound = useRef<HTMLAudioElement>(null);

  let int1: any = useRef(null);
  let int2: any = useRef(null);

  const getTime = (seconds: number) => {
    var date = new Date(0);
    date.setSeconds(seconds);
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  };

  const startTimerOne = useCallback(() => {
    const longTimer = () => {
      const seconds = totes * 60;
      setFullTimeString(getTime(seconds));
    };
    int1.current = setInterval(longTimer, totes);
  }, [totes]);

  const startTimerTwo = useCallback(() => {
    let totalTime = totes * 60 * 1000;
    const totWidth = totes * 60;

    const shortTimer = () => {
      let left = totalTime - 1000;
      const seconds = left / 1000;
      setTimeString(getTime(seconds));
      const width = (seconds / totWidth) * 100;
      setTimerWidth(width);

      totalTime = left;
      if (left === 0) {
        console.log("Time is up");
        clearInterval(int1.current);
        clearInterval(int2.current);
        setTimerWidth(0);
        sound.current?.play();
      }
    };
    int2.current = setInterval(shortTimer, 1000);
  }, [totes]);

  const setNextInList = () => {
    clearInterval(int1.current);
    clearInterval(int2.current);
    int1.current = null;
    int2.current = null;

    const index = timeListIndex + 1;

    if (index < timeList.length) {
      setTotes(timeList[index]);
      setTimeListIndex(index);
    }
  };

  useEffect(() => {
    if (sound.current) {
      sound.current.volume = 0.1;
    }
    if (timeListIndex > -1) {
      startTimerOne();
      startTimerTwo();
    }
  }, [timeListIndex, startTimerOne, startTimerTwo]);

  const startTimers = () => {
    if (sound.current) {
      sound.current.volume = 0.1;
    }
    setTimeListIndex(0);
  };

  const cancelAll = () => {
    clearInterval(int1.current);
    clearInterval(int2.current);
    int1.current = null;
    int2.current = null;
    setTimeListIndex(-1);
  };

  return (
    <div className={styles.timer}>
      Time: {timeString} / {fullTimeString}&nbsp;
      {timeListIndex === -1 ? (
        <button onClick={startTimers}>Start</button>
      ) : (
        <button onClick={setNextInList} disabled={timerWidth > 0}>
          Next
        </button>
      )}
      <br />
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: timerWidth + "%" }}></div>
      </div>
      <div className={styles.allDone}>
        <button onClick={cancelAll}>All done! :D</button>
      </div>
      <audio src={Pling} ref={sound}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
}

export default Timer;
