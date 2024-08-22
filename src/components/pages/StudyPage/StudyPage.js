import { useParams } from "react-router-dom";
import StudyBody from "./components/StudyBody";

export function StudyPage() {
  const { studyId } = useParams();
  return (
    <>
      <StudyBody studyId={studyId} />
    </>
  );
}

export default StudyPage;
