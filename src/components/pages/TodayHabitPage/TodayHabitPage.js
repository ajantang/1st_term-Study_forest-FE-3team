import { useState } from "react";
import { useParams } from "react-router-dom";
import CurrentTime from "./components/CurrentTime";
import HabitsList from "./components/HabitsList";
import ListModal from "./components/ListModal";
<<<<<<< HEAD
import "./TodayHabitPage.css";
import StudyTitle from "./components/StudyTitle";
=======
>>>>>>> develop

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
<<<<<<< HEAD
    <div className="main__todayHabitPage flex-row border-box">
      <div className="todayHabitpage__body flex-col border-box">
        <StudyTitle studyId={studyId}/>
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
=======
    <>
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
    </>
>>>>>>> develop
  );
}

export default TodatHabitPage;
