import { useEffect, useState } from "react";
import {
  createSuccessHabitDate,
  deleteSuccessHabitDate,
} from "../../../../api/api";
import "./HabitsListBody.css";

// 습관 리스트 바디
function HabitsListBody({ habit }) {
  const [successId, setSuccessId] = useState(habit.HabitSuccessDates[0]?.id); // 완료한 습관일 시 HabitSuccessDates의 id 저장
  const [successError, setSuccessError] = useState(false);
  const [habitClassName, setHabitClassName] = useState(
    // 완료 여부에 따른 배경 색 변경 클래스
    "habitsList__list-li flex-row font16 bold habitsListBody--false border-box"
  );

  const habitId = habit.id;

  useEffect(() => {
    if (successId) {
      setHabitClassName(
        "habitsList__list-li flex-row font16 bold habitsListBody--true border-box" // 완료한 습관일 때
      );
    } else {
      setHabitClassName(
        "habitsList__list-li flex-row font16 bold habitsListBody--false border-box" // 미완료한 습관일때
      );
    }
    setSuccessError(false);
  }, [successId]);

  // 습관 완료 추가 및 취소 함수
  const successApiHandler = async () => {
    if (!successError) {
      if (successId) {
        try {
          setSuccessError(true);
          await deleteSuccessHabitDate(successId); // 습관 완료 취소
          setSuccessId("");
        } catch (e) {
          setSuccessError(false);
          alert("잠시 후 다시 시도해주세요");
        }
      } else if (!successId) {
        try {
          setSuccessError(true);
          const res = await createSuccessHabitDate(habitId); // 습관 완료 추가
          setSuccessId(res.id);
        } catch (e) {
          setSuccessError(false);
          alert("잠시 후 다시 시도해주세요");
        }
      }
    }
  };

  return (
    <div className={habitClassName} onClick={successApiHandler}>
      <p className="habitsListBody__text flex-row border-box">{habit.name}</p>
    </div>
  );
}

export default HabitsListBody;
