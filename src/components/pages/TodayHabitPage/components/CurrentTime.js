import { useEffect, useState } from "react";
import "./CurrentTime.css";

function CurrentTime() {
  const [time, setTime] = useState(new Date()); // 날짜 및 시간 저장

  // 1초 마다 새로운 날짜 및 시간 저장
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const year = time.getFullYear();                            // Date 객체에서 연도 추출
  const month = String(time.getMonth() + 1).padStart(2, "0"); // Date 객체에서 월 추출
  const day = String(time.getDate()).padStart(2, "0");        // Date 객체에서 일 추출
  const hour = time.toLocaleTimeString([], {                  // Date 객체에서 시간 추출
    hour: "numeric", // 십의 자리 숫자 외 한글자
    minute: "2-digit", // 무조건 두글자
  });

  const today = `${year}-${month}-${day} ${hour}`;

  return (
    <div className="currentTime__body border-box">
      <div className="currentTime__text-color font18 regular border-box">
        현재 시간
      </div>
      <div className="currenTime__time flex-row font16 medium border-box">
        {today}
      </div>
    </div>
  );
}

export default CurrentTime;
