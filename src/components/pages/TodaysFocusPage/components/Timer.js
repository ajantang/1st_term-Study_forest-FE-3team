import React, { useEffect, useState } from "react";
import { updatePoint } from "../../../../api/api.js";
import { changeDigits, changeTime } from "../utils/changeTime.js"
import "./timer.css";

const T = 68;
const M = "01";
const S = "08";

const Timer = ({ initialPoint, setPoint, setAlertGetPoint, id }) => {
  var initPoint;
  if (initialPoint) {
    initPoint = initialPoint;
  }
  const [countTime, setCountTime] = useState(T);
  const [initialTime, setInitialTime] = useState(T);
  const [minute, setMinute] = useState(M);
  const [second, setSecond] = useState(S);
  const [pauseTimer, setPauseTimer] = useState("");
  const [clearTimer, setClearTimer] = useState("");
  const [stopTimer, setStopTimer] = useState("");
  const [alertCondition, setAlertCondition] = useState("");
  const [totalPoint, setTotalPoint] = useState(initPoint);
  const [timerState, setTimerState] = useState(true);
  const [cssState, setCssState] = useState(false);

  // 변수 초기화
  function init() {
    setCountTime(T);
    setInitialTime(T);
    setMinute(M);
    setSecond(S);
    setClearTimer("");
    setPauseTimer("");
    setAlertCondition("");
    setTimerState(true);
    setCssState(false);
  }

  //INPUT값 받아와서 변환
  const timerMinute = (e) => {
    setMinute(changeDigits(e.target.value));
    setCountTime(Number(e.target.value * 60) + Number(second));
    setInitialTime(Number(e.target.value * 60) + Number(second));
  };

  const timerSecond = (e) => {
    setSecond(changeDigits(e.target.value));
    setCountTime(Number(minute * 60) + Number(e.target.value));
    setInitialTime(Number(minute * 60) + Number(e.target.value));
  };


  var obtainPoint = 0; //획득하는 포인트 저장
  var timer; //setInterval 저장

  //start버튼 클릭
  const StartTimer = (e) => {
    setAlertGetPoint("");
    setCssState(true);
    e.target.className += "start";
    setAlertCondition("");
    var count = countTime;

    setPauseTimer(
      <button
        type="button"
        className="timer__controls__pause"
        onClick={PauseTimer}
      ></button>
    );

    setClearTimer(
      <button
        type="button"
        className="timer__controls__reset"
        onClick={ClearTimer}
      ></button>
    );

    timer = setInterval(() => {
      count--;
      setCountTime(count);
      if (count >= 0) {
        if (count >= 60) {
          setMinute(changeDigits(Math.floor(count / 60)));
          setSecond(changeDigits(count % 60));
        } else {
          setMinute(changeDigits(0));
          setSecond(changeDigits(count));
        }

        if (count === 0) {
          obtainPoint = obtainPoint + 3;
        }
      } else {
        setCssState("over");
        setTimerState(false);
        setClearTimer("");
        setPauseTimer("");
        setStopTimer(
          <button
            type="button"
            id="stoptbtn"
            className="timer__controls__active"
            onClick={StopTimer}
          >
            {" "}
            &nbsp;&nbsp; Stop!{" "}
          </button>
        );
        if (count >= -60) {
          setSecond(changeDigits(Math.abs(count)));
        } else {
          setMinute(changeDigits(Math.floor(Math.abs(count) / 60)));
          setSecond(changeDigits(Math.abs(count % 60)));
        }

        if (count % 600 === 0) {
          obtainPoint++;
          console.log(obtainPoint);
        }
      }
    }, 1000);
  };

  //stop버튼 클릭
  const StopTimer = () => {
    let total = initialPoint + obtainPoint;
    setTotalPoint(total);
    init();
    clearInterval(timer);
    setStopTimer("");
    setPoint(total);
    setAlertGetPoint(
      <div className="condition__alert points font16">
        {" "}
        <span>
          {" "}
          {obtainPoint}포인트를 획득했습니다!
        </span>
      </div>
    );
  };

  //pause버튼 클릭
  const PauseTimer = () => {
    setAlertCondition(
      <div className="condition__alert pause font16">
        {" "}
        <span>집중이 중단되었습니다.</span>
      </div>
    );
    clearInterval(timer);
  };

  //reset버튼 클릭
  const ClearTimer = () => {
    init();
    clearInterval(timer);
  };

  //획득한 총 포인트가 저장될 때마다 실행(stop버튼)
  useEffect(() => {
    const options = {
      point: totalPoint,
    };

    const updateinfo = async (id, options) => {
      await updatePoint(id, options);
    };

    updateinfo(id, options);
  }, [totalPoint, id]);

  return (
    <>
      <div className="timerset__display">
        <div className="timerset__display__icon"></div>
        {changeTime(initialTime)}
      </div>
      <div
        className={`timer font150 ${cssState ? (cssState === "over" ? "gray" : "vividred") : ""
          }`}
      >
        <span>{timerState ? "" : "-"}</span>
        <input
          type="text"
          className={`timer__input font150 ${cssState ? (cssState === "over" ? "gray" : "vividred") : ""
            }`}
          value={minute}
          onChange={timerMinute}
        />{" "}
        <span>:</span>
        <input
          type="text"
          className={`timer__input font150 ${cssState ? (cssState === "over" ? "gray" : "vividred") : ""
            }`}
          value={second}
          onChange={timerSecond}
        />
      </div>

      <div className="timer__controls">
        {pauseTimer}
        {stopTimer}
        <button
          type="button"
          id="startbtn"
          className={`timer__controls__active ${timerState ? "" : "nodisplay"}`}
          onClick={StartTimer}
        >
          {" "}
          &nbsp;&nbsp; Start!{" "}
        </button>
        {clearTimer}
      </div>
      <div className="condition">{alertCondition}</div>
    </>
  );
};

export default Timer;
