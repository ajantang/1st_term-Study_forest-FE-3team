import { useAuth } from "./AuthContext";
import Modal from "./components/pages/StudyPage/components/Modal";
import { useState } from "react";

const ProtectedRoute = ({ children, modalType }) => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(!isAuthenticated);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!isAuthenticated) {
    return (
      <Modal
        studyName="test"
        isOpen={true}
        modalType={modalType}
        onClose={handleCloseModal}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
