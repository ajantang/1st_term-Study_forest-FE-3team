import { useEffect, useState } from "react";

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
    <div>
      <p className="font32">현재 시간</p>
      <p className="font32">{today}</p>
    </div>
  );
}

export default CurrentTime;
