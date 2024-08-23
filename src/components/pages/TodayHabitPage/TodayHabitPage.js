import { useState } from "react";
import { useParams } from "react-router-dom";
import CurrentTime from "./components/CurrentTime";
import HabitsList from "./components/HabitsList";
import ListModal from "./components/ListModal";
import "./TodayHabitPage.css";

function TodatHabitPage() {
  const [modalOn, setModalOn] = useState(false);
  const [pageRender, setPageRender] = useState(false);
  const { studyId } = useParams();

  const patchListHandler = () => {
    if (modalOn) {
      setModalOn(false);
    } else {
      setModalOn(true);
    }
  };

  return (
    <div className="main__todayHabitPage border-box flex-row">
      <div className="todayHabitpage__body border-box flex-row">
        <div className="todayHaibtPage__content border-box ">
          <CurrentTime />
          <HabitsList
            studyId={studyId}
            patchList={patchListHandler}
            pageRender={pageRender}
            setPageRender={setPageRender}
          />
          <ListModal
            studyId={studyId}
            modalState={modalOn}
            patchList={patchListHandler}
            setPageRender={setPageRender}
          />
        </div>
      </div>
    </div>
  );
}

export default TodatHabitPage;
