<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { updatePoint } from "../../../../api/api.js";

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

  function changeDigits(i) {
    i = String(i);
    if (i.length === 1) {
      i = i.padStart(2, "0");
    } else if (i.length >= 3) {
      i = i.substring(1, 3);
    }
    return i;
  }

  function changeTime(i) {
    if (i <= 60) {
      i = "00:" + changeDigits(String(i));
    } else {
      i = changeDigits(Math.floor(i / 60)) + ":" + changeDigits(String(i % 60));
    }
    return i;
  }

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

  var timer;
  var obtainPoint = 0;

  const StartTimer = (e) => {
    setAlertGetPoint("");
    setCssState(true);
    e.target.className += "start";
    setAlertCondition("");
    var count = countTime;

    setPauseTimer(
      <button
        type="button"
        className="timerbtns__pausebtn"
        onClick={PauseTimer}
      ></button>
    );
    setClearTimer(
      <button
        type="button"
        className="timerbtns__resetbtn"
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
            className="timerbtns__controlbtn stop"
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
        <span className="condition__alert-text">
          {" "}
          {obtainPoint}포인트를 획득했습니다!
        </span>
      </div>
    );
  };

  const PauseTimer = () => {
    setAlertCondition(
      <div className="condition__alert pause font16">
        {" "}
        <span className="condition__alert-text">집중이 중단되었습니다.</span>
      </div>
    );
    clearInterval(timer);
  };

  const ClearTimer = () => {
    init();
    clearInterval(timer);
  };

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
      <div className="targettime">
        <div className="targettime__icon"></div>
        {changeTime(initialTime)}
      </div>
      <div
        className={`timer font150 ${
          cssState ? (cssState === "over" ? "gray" : "vividred") : ""
        }`}
      >
        <span>{timerState ? "" : "-"}</span>
        <input
          type="text"
          className={`timer__input font150 ${
            cssState ? (cssState === "over" ? "gray" : "vividred") : ""
          }`}
          value={minute}
          onChange={timerMinute}
        />{" "}
        <span>:</span>
        <input
          type="text"
          className={`timer__input font150 ${
            cssState ? (cssState === "over" ? "gray" : "vividred") : ""
          }`}
          value={second}
          onChange={timerSecond}
        />
      </div>

      <div className="timerbtns">
        {pauseTimer}
        {stopTimer}
        <button
          type="button"
          id="startbtn"
          className={`timerbtns__controlbtn ${timerState ? "" : "nodisplay"}`}
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
=======
import React, { useContext, useEffect, useState } from "react";
import { updatePoint } from "../../../../api/api.js";
import { changeDigits, changeTime } from "../utils/changeTime.js"
import "./timer.css";
import { studyIdContext } from "../TodaysFocusPage.js";
// 

const T = 25*60;
const M = "25";
const S = "00";

const Timer = ({ initialPoint, setPoint, setAlertGetPoint }) => {
  var initPoint;
  if(initialPoint){
    initPoint = initialPoint;
  }
  const [countTime, setCountTime] = useState(T);  // 입력한 시간이 카운트다운되는 숫자
  const [initialTime, setInitialTime] = useState(T); // 입력한 시간이 저장되는 숫자
  const [minute, setMinute] = useState(M);
  const [second, setSecond] = useState(S);
  const [pauseTimer, setPauseTimer] = useState(""); // 일시정지 버튼 동적 할당
  const [clearTimer, setClearTimer] = useState(""); // 초기화 버튼 동적 할당
  const [controlTimer, setControltimer] = useState(""); // 시작, 재시작, 종료 버튼 동적 할당
  const [alertCondition, setAlertCondition] = useState(""); // 상태 메세지 동적 할당
  const [totalPoint, setTotalPoint] = useState(initPoint); // 획득한 포인트를 더한 총 포인트
  const [state, setState] = useState(false); // 상태에 따라 css 클래스 변경
  const [btnText, setBtnText] = useState('Start'); // 상태에 따라 css 클래스 변경
  const [isDisableBtn, setIsDisableBtn] = useState(false); // 버튼 비활성화 상태 변경
  const [isDisableInput, setIsDisableInput] = useState(false); // input 비활성화 상태 변경

  function changeCss(form, state) {
    const button = {
      false: "init",
      start: "start",
      tenmin: "start",
      over: "nodisplay",
      pause: "restart",
    };

    const input = {
      false: "",
      tenmin: "vividred",
      over: "gray",
      pause: "",
    };
    
    return form === 'input' ? input[state] : button[state];
  }

  // 초기화 함수 
  function init() {
    setCountTime(T);
    setInitialTime(T);
    setMinute(M);
    setSecond(S);
    setClearTimer("");
    setPauseTimer("");
    setAlertCondition("");
    setState(false);
    setIsDisableBtn(false);
    setIsDisableInput(false);
    setBtnText("Start");
  }

  //INPUT값 받아와서 변환
  const timerMinute = (e) => {
    let min = changeDigits(e.target.value);
    setMinute(min);
    setCountTime(Number(min * 60) + Number(second));
    setInitialTime(Number(min * 60) + Number(second));
  };
  
  const timerSecond = (e) => {
    let sec = changeDigits(e.target.value);
    //60이상의 값 입력 시 분으로 자동 넘김
    if(sec >= 60){
      if(minute >= 99){
        sec = 59
        setSecond(sec);
        alert('100분 이하로 설정해주세요');
      } else {
        let min = Number(minute) + Math.floor(sec/60);
        sec = sec-60;
        setSecond(changeDigits(sec));
        setMinute(changeDigits(min));
      }
    } else {
      setSecond(sec);
    }
    setCountTime(Number(minute * 60) + Number(sec));
    setInitialTime(Number(minute * 60) + Number(sec));
  };

  var obtainPoint = 0; // 획득하는 포인트 저장
  var timer; // setInterval 저장

  //start버튼 클릭
  const StartTimer = () => {
    var count = countTime; // 타이머 변수 , 1초마다 -1이 됨
    setAlertGetPoint(""); // 획득 포인트 알림 화면 초기화(TodaysFocusPage)
    setState("start");
    setBtnText("Start");
    setAlertCondition(""); // 일시정지 알림 화면 초기화
    setIsDisableBtn(true);
    setIsDisableInput(true);

    // 일시정지 버튼 동적 생성
    setPauseTimer(
      <button
        type="button"
        className="timer__controls__pause"
        onClick={PauseTimer}
      ></button>
    );

    // 초기화 버튼 동적 생성
    setClearTimer(
      <button
        type="button"
        className="timer__controls__reset"
        onClick={ClearTimer}
      ></button>
    );

    // 1초 간격으로 실행
    timer = setInterval(() => {
      count--;
      setCountTime(count);
      // 시간 초과 전까지 실행 함수
      if (count >= 0) {
        // 60초 이하로 남았을 때는 분은 0으로 고정
        if (count >= 60) {
          setMinute(changeDigits(Math.floor(count / 60)));
          setSecond(changeDigits(count % 60));
        } else {
          setMinute(changeDigits(0));
          setSecond(changeDigits(count));
          // 10초 이하로 남았을 때는 빨간색 글씨로 변경
          if(count <= 10){
            setState('tenmin')
          }
        }
        // 남은시간이 0이 되면 3포인트를 얻음
        if (count === 0) {
          obtainPoint = obtainPoint + 3;
        }
      } else { // 타이머 초과 시 행동 
        setState("over");
        setClearTimer("");
        setPauseTimer("");
        // 정지 버튼 동적 생성
        setControltimer(
          <button
            type="button"
            id="stoptbtn"
            className={`timer__controls__active extra-bold stop`}
            onClick={StopTimer}
          >
            &nbsp;&nbsp; Stop!
          </button>
        );
        if (count >= -60) { // 초과 시간이 60초가 넘어갈 때 화면 표시 계산
          setSecond(changeDigits(Math.abs(count)));
        } else {
          setMinute(changeDigits(Math.floor(Math.abs(count) / 60)));
          setSecond(changeDigits(Math.abs(count % 60)));
        };

        // 10분 초과 시 1포인트 얻음
        if (count % 600 === 0) {
          obtainPoint++;
          console.log(obtainPoint);
        };
      }
    }, 1000);
  };

  //stop버튼 클릭
  const StopTimer = () => {
    let total = initPoint + obtainPoint; // 기존 포인트에 얻은 포인트를 합한 총 포인트
    setTotalPoint(total); // db에 저장할 포인트
    init(); // 초기화
    clearInterval(timer);
    setControltimer("");
    setPoint(total); // 획득한 포인트에 변화 줘서 렌더링
    setAlertGetPoint(
      <div className="condition__alert points font16 medium">
        🎉 {obtainPoint}포인트를 획득했습니다!
      </div>
    );
  };

  //pause버튼 클릭
  const PauseTimer = () => {
    setBtnText("ReStart");
    setState("pause");
    setIsDisableBtn(false);
    setAlertCondition(
      <div className="condition__alert pause font16 medium">
        🚨 집중이 중단되었습니다.
      </div>
    );
    clearInterval(timer);
  };

  //reset버튼 클릭
  const ClearTimer = () => {
    init(); // 초기화
    clearInterval(timer);
  };

  let studyId = useContext(studyIdContext);
  //획득한 총 포인트가 저장될 때마다 실행(stop버튼)
  useEffect(() => {
    const options = {
      point: totalPoint,
    };

    const updateinfo = async (studyId, options) => {
      await updatePoint(studyId, options);
    };

    updateinfo(studyId, options);
  }, [totalPoint, studyId]);

  return (
    <>
      <div className="timerset__display font16 medium">
        <div className="timerset__display__icon"></div>
        {changeTime(initialTime)}
      </div>
      <div
        className={`timer extra-bold font150 ${changeCss('input', state)}`}
      >
        {state === "over" ? "-" : ""}
        <input
          type="text"
          className={`timer__input extra-bold font150 ${changeCss('input', state)}`}
          value={minute}
          onChange={timerMinute}
          disabled={isDisableInput}
        />
        :
        <input
          type="text"
          className={`timer__input extra-bold font150 ${changeCss('input', state)}`}
          value={second}
          onChange={timerSecond}
          disabled={isDisableInput}
        />
      </div>

      <div className="timer__controls">
        {pauseTimer}
        {controlTimer}
        <button
          type="button"
          id="startbtn"
          className={`timer__controls__active extra-bold ${changeCss('button', state)}`}
          onClick={StartTimer}
          disabled={isDisableBtn}
        >
          &nbsp;&nbsp; {btnText}!
        </button>
        {clearTimer}
      </div>
      <div className="content__alert">{alertCondition}</div>
    </>
  );
};

export default Timer;
>>>>>>> develop
