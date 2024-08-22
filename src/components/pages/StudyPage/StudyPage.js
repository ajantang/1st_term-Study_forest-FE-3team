import { useParams } from "react-router-dom";
import StudyBody from "./components/StudyBody";
import Header from "../../Layout/Header";

export function StudyPage() {
  const { studyId } = useParams();
  return (
    <>
      <Header />
      <StudyBody studyId={studyId} />
    </>
  );
}

export default StudyPage;
