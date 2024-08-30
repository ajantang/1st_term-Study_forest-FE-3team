import { useParams } from "react-router-dom";
import StudyBody from "./components/StudyBody";
import { useEffect } from "react";
import UpdateRecentlyViewed from "../../../utils/UpdateRecentlyViewed";

export function StudyPage() {
  const { studyId } = useParams();

  useEffect(() => {
    UpdateRecentlyViewed(studyId)
  }, [studyId])
  
  return (
    <>
      <StudyBody studyId={studyId} />
    </>
  );
}

export default StudyPage;
