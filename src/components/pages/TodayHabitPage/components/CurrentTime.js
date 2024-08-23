import { useEffect, useState } from "react";
import './CurrentTime.css'

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const day = String(time.getDate()).padStart(2, "0");
  const hour = time.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const today = `${year}-${month}-${day} ${hour}`;

  return (
    <div className="currentTime__body border-box">
      <div className="currentTime__text font18 regular border-box">현재 시간</div>
      <div className="currenTime__time font16 medium border-box">{today}</div>
    </div>
  );
}

export default CurrentTime;
