import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentTime from "./components/CurrentTime";
import HabitsList from "./components/HabitsList";
import ListModal from "./components/ListModal";
import "./TodayHabitPage.css";
import StudyTitle from "./components/StudyTitle";
import UpdateRecentlyViewed from "../../../utils/UpdateRecentlyViewed";

export const studyIdContext = createContext();

function TodatHabitPage() {
  const [modalOn, setModalOn] = useState(false);
  const [pageRender, setPageRender] = useState(false);
  const { studyId } = useParams();

  UpdateRecentlyViewed(studyId)

  const patchListHandler = () => {
    if (modalOn) {
      setModalOn(false);
    } else {
      setModalOn(true);
    }
  };

  return (
    <studyIdContext.Provider value={studyId}>
      <div className="main__todayHabitPage flex-row border-box">
        <div className="todayHabitpage__body flex-col border-box">
          <StudyTitle buttonName={"오늘의 집중"} />
          <div className="todayHaibtPage__content border-box ">
            <CurrentTime />
            <HabitsList
              patchList={patchListHandler}
              pageRender={pageRender}
              setPageRender={setPageRender}
            />
            <ListModal
              modalState={modalOn}
              patchList={patchListHandler}
              setPageRender={setPageRender}
            />
          </div>
        </div>
      </div>
    </studyIdContext.Provider>
  );
}

export default TodatHabitPage;
