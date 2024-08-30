import { useParams } from "react-router-dom";
import StudyBody from "./components/StudyBody";
import { useEffect, useState } from "react";
import { UpdateRecentlyViewed } from "../../../utils/UpdateRecentlyViewed";
import LodingPage from "../../Layout/LodingPage";

export function StudyPage() {
  const [loding, setLoding] = useState(false); //-------
  const { studyId } = useParams();

  useEffect(() => {
    UpdateRecentlyViewed(studyId);
  }, [studyId]);

  return (
    <>
      <StudyBody studyId={studyId} setLoding={setLoding} />
      {loding && <LodingPage />}
    </>
  );
}

export default StudyPage;
