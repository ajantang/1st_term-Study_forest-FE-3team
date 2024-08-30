import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentTime from "./components/CurrentTime";
import HabitsList from "./components/HabitsList";
import ListModal from "./components/ListModal";
import "./TodayHabitPage.css";
import StudyTitle from "./components/StudyTitle";
import UpdateRecentlyViewed from "../../../utils/UpdateRecentlyViewed";
import LodingPage from "../../Layout/LodingPage";

export const studyIdContext = createContext();

function TodatHabitPage() {
  const [modalOn, setModalOn] = useState(false);
  const [pageRender, setPageRender] = useState(false);
  const [loding, setLoding] = useState(false)
  const { studyId } = useParams();

  useEffect(() => {
    UpdateRecentlyViewed(studyId)
  }, [studyId])

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
              setLoding={setLoding}
            />
            <ListModal
              modalState={modalOn}
              patchList={patchListHandler}
              setPageRender={setPageRender}
            />
          </div>
        </div>
      </div>
      {loding && <LodingPage />}
    </studyIdContext.Provider>
  );
}

export default TodatHabitPage;
