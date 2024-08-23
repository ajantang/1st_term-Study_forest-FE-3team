import { useEffect, useState } from "react";
import { gethabitList } from "../../../../api/api";
import HabitsListBody from "./HabitsListBody";
import "./HabitsList.css";

function HabitsList({ studyId, patchList, pageRender, setPageRender }) {
  const [list, setList] = useState([]);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    // API 호출 함수
    const getList = async () => {
      const data = await gethabitList(studyId);
      setList(data.habits);
    };

    if (first) {
      // 첫 렌더링 시
      getList();
      setFirst(false);
    } else if (pageRender) {
      getList();
      setPageRender(false);
    }
  }, [studyId, list, pageRender, setPageRender, first]);

  return (
    <div className="habitsList__body flex-col">
      <div className="habitsList__title-button flex-row">
        <p className="habitsList__title">오늘의 습관</p>
        <p onClick={patchList}>목록 수정</p>
      </div>
      {!list[0] && (
        <div>아직 습관이 없어요 목록 수정을 눌러 습관을 생성해보세요</div>
      )}
      {list[0] && (
        <ol>
          {list.map((habit) => {
            return (
              <li key={habit.id}>
                <HabitsListBody habit={habit} />
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export default HabitsList;
