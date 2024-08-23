import { useEffect, useState } from "react";
import { deleteSuccess, postSuccess } from "../../../../api/api";
import "./HabitsListBody.css";

// 습관 리스트 바디
function HabitsListBody({ habit }) {
  const [successId, setSuccessId] = useState(habit.HabitSuccessDates[0]?.id);
  const [habitClassName, setHabitClassName] = useState(
    "habitsListBodylist--fals"
  );

  const habitId = habit.id;
  
  useEffect(() => {
    if (successId) {
      setHabitClassName("habitsListBodylist--true");
    } else {
      setHabitClassName("habitsListBodylist--fals");
    }
  }, [habit, successId]);

  const successApiHandler = async () => {
    if (successId) {
      await deleteSuccess(successId); // 습관 완료 취소
      setSuccessId("");
    } else if (!successId) {
      const res = await postSuccess(habitId); // 습관 완료 추가
      setSuccessId(res.id);
    }
  };

  return (
    <div className={habitClassName} onClick={successApiHandler}>
      {habit.name}
    </div>
  );
}

export default HabitsListBody;
