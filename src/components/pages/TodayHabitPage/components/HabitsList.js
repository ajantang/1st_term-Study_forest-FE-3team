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
    <div className="habitsList__body flex-col border-box">
      <div className="habitsList__title-button flex-row border-box">
        <div className="habitsList__title font24 extra-bold border-box">
          오늘의 습관
          <p
            className="habitsList__button font14 medium border-box"
            onClick={patchList}
          >
            목록 수정
          </p>
        </div>
      </div>
      <div className="habitsList_iist-text flex-row border-box">
        {!list[0] && (
          <div className="habitsList_noList-text font20 medium border-box">
            아직 습관이 없어요
            <br />
            목록 수정을 눌러 습관을 생성해보세요
          </div>
        )}
        {list[0] && (
          <ol className="habitsList_list-ol flex-col border-box">
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
    </div>
  );
}

export default HabitsList;
