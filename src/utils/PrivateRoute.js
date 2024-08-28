import { Outlet, useLocation } from "react-router-dom";
import Modal from "../components/pages/StudyPage/components/Modal"

  import {
    MODAL_GOTO_HABIT,
    MODAL_GOTO_CONCENTRATION,
  } from "../constants/global";

function PrivateRoute() {
  const location = useLocation();
  const path = location.pathname;
  const page = path.substring(path.lastIndexOf('/')+1);

  let modalType;
  if(page === 'todayHabit') {
    modalType = MODAL_GOTO_HABIT;
  } else {
    modalType = MODAL_GOTO_CONCENTRATION;
  }

  const closeModal = () => {};

  if(location.state === 'focus' || location.state === 'habit') {
    return (
      <Outlet />
    )
  } else {
    return (
      <>
        <Modal
          studyName=''
          isOpen={true}
          onClose={closeModal}
          modalType={modalType}
        />
      </>
    )
  }

};

export default PrivateRoute
