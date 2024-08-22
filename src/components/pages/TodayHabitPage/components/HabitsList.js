import { useEffect, useState } from "react";
import { gethabitList } from "../../../../api/api";
import HabitsListBody from "./HabitsListBody";

function HabitsList({ studyId, patchList, pageRender, setPageRender }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    // API 호출 함수
    const getList = async () => {
      const data = await gethabitList(studyId);
      setList(data.habits);
    };

    if (!list[0]) {
      // 첫 렌더링 시
      getList();
    } else if (pageRender) {
      getList();
      setPageRender(false);
    }
  }, [studyId, list, pageRender, setPageRender]);

  return (
    <div>
      <div>
        <p className="font32">오늘의 습관</p>
        <p className="font32" onClick={patchList}>
          목록 수정
        </p>
      </div>
      {!list[0] && (
        <div className="font32">
          아직 습관이 없어요 목록 수정을 눌러 습관을 생성해보세요
        </div>
      )}
      {list[0] && (
        <ol>
          {list.map((habit) => {
            return (
              <li className="font32" key={habit.id}>
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
