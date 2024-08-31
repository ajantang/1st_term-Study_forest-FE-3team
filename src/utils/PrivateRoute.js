import { Outlet, useLocation } from "react-router-dom";
import Modal from "../components/pages/StudyPage/components/Modal";

import {
  MODAL_EDIT_STUDY,
  MODAL_GOTO_HABIT,
  MODAL_GOTO_CONCENTRATION,
} from "../constants/global";
import { useNavigate } from "react-router-dom";

function PrivateRoute() {
  const location = useLocation();
  const path = location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1);
  const navigate = useNavigate();

  let modalType;

  switch (page) {
    case "todayHabit": {
      modalType = MODAL_GOTO_HABIT;
      break;
    }
    case "todaysFocus": {
      modalType = MODAL_GOTO_CONCENTRATION;
      break;
    }
    case "modify": {
      modalType = MODAL_EDIT_STUDY;
      break;
    }
    default:
      modalType = MODAL_CONFIRM;
  }

  const closeModal = () => {
    navigate("/");
  };

  if (
    location.state === "focus" ||
    location.state === "habit" ||
    location.state === "modify"
  ) {
    return <Outlet />;
  } else {
    return (
      <>
        <Modal
          studyName=""
          isOpen={true}
          onClose={closeModal}
          modalType={modalType}
        />
      </>
    );
  }
}

export default PrivateRoute;
