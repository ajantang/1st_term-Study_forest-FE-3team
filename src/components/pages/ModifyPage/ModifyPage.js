import { useParams } from "react-router-dom";
import ModifyBody from "./components/ModifyBody";

export function ModifyPage() {
  const { studyId } = useParams();

  return (
    <>
      <ModifyBody studyId={studyId} />
    </>
  );
}

export default ModifyPage;
