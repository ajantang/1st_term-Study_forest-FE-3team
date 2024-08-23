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
  };

  const [countTime, setCountTime] = useState(T);  // 입력한 시간 계산 후 카운트다운되는 숫자
  const [initialTime, setInitialTime] = useState(T); //입력한 시간 계산 후 저장되는 숫자
  const [minute, setMinute] = useState(M);
  const [second, setSecond] = useState(S);
  const [pauseTimer, setPauseTimer] = useState(""); // 일시정지 버튼 동적 할당
  const [clearTimer, setClearTimer] = useState(""); // 초기화 버튼 동적 할당
  const [controlTimer, setControltimer] = useState(""); // 시작, 재시작, 종료 버튼 동적 할당
  const [alertCondition, setAlertCondition] = useState(""); // 상태 메세지 동적 할당
  const [totalPoint, setTotalPoint] = useState(initPoint); // 획득한 포인트를 더한 총 포인트
  const [state, setState] = useState(false); // 상태에 따라 css 클래스 변경
  const [btnText, setBtnText] = useState('Start'); // 상태에 따라 css 클래스 변경
  const [isDisable, setIsDisable] = useState(false);

  function changeCss(form, state) {
    const button = {
      false: "",
      start: "start",
      over: "nodisplay",
      pause: "restart",
    };

    const input = {
      false: "",
      start: "vividred",
      over: "gray",
      pause: "",
    };
    
    return form === 'input' ? input[state] : button[state];
  }

  // 변수 초기화
  function init() {
    setCountTime(T);
    setInitialTime(T);
    setMinute(M);
    setSecond(S);
    setClearTimer("");
    setPauseTimer("");
    setAlertCondition("");
    setState(false);
    setIsDisable(false);
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


  var obtainPoint = 0; // 획득하는 포인트 저장
  var timer; // setInterval 저장

  //start버튼 클릭
  const StartTimer = (e) => {
    var count = countTime;
    setAlertGetPoint("");
    setState("start");
    setBtnText("Start");
    setAlertCondition("");
    setIsDisable(true);

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
        setState("over");
        setClearTimer("");
        setPauseTimer("");
        setControltimer(
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
        };

        if (count % 600 === 0) {
          obtainPoint++;
          console.log(obtainPoint);
        };
      }
    }, 1000);
  };

  //stop버튼 클릭
  const StopTimer = () => {
    let total = initialPoint + obtainPoint;
    setTotalPoint(total);
    init();
    clearInterval(timer);
    setControltimer("");
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
    setBtnText("ReStart");
    setState("pause");
    setIsDisable(false);
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
        className={`timer font150 ${changeCss('input', state)}`}
      >
        <span>{state === "over" ? "-" : ""}</span>
        <input
          type="text"
          className={`timer__input font150 ${changeCss('input', state)}`}
          value={minute}
          onChange={timerMinute}
        />{" "}
        <span>:</span>
        <input
          type="text"
          className={`timer__input font150 ${changeCss('input', state)}`}
          value={second}
          onChange={timerSecond}
        />
      </div>

      <div className="timer__controls">
        {pauseTimer}
        {controlTimer}
        <button
          type="button"
          id="startbtn"
          className={`timer__controls__active ${changeCss('button', state)}`}
          onClick={StartTimer}
          disabled={isDisable}
        >
          {" "}
          &nbsp;&nbsp; {btnText}!{" "}
        </button>
        {clearTimer}
      </div>
      <div className="content__alert">{alertCondition}</div>
    </>
  );
};

export default Timer;
