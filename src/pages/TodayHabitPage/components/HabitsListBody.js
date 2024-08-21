import { useEffect, useState } from "react";
import { deleteSuccess, postSuccess } from "../../../api/api";
import "./HabitsListBody.css";

// 습관 리스트 바디
function HabitsListBody({ habit }) {
  const [successId, setSuccessId] = useState("");
  const [habitClassName, setHabitClassName] = useState("habitsListBody__list--fals");
  const [firstLoding, setFirstLoding] = useState(true);
  const habitId = habit.id;

 
  useEffect(() => {
    if (firstLoding && habit.HabitSuccessDates[0]) { // 첫 렌더링 시 완료한 것일 경우
      setHabitClassName("habitsListBody__list--true");
      setSuccessId(habit.HabitSuccessDates[0].id);
      setFirstLoding(false);
    } else if (successId) {
      setHabitClassName("habitsListBody__list--true");
    } else {
      setHabitClassName("habitsListBody__list--fals");
    }
  }, [habit, successId, firstLoding]);

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
