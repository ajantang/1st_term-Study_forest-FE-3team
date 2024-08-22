import { useState } from "react";
import { useParams } from "react-router-dom";
import CurrentTime from "./components/CurrentTime";
import HabitsList from "./components/HabitsList";
import ListModal from "./components/ListModal";

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
  );
}

export default TodatHabitPage;
