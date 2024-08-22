import Header from "../../Layout/Header.js";
import InputForm from "./components/InputForm.js";

const CreateStudyPage = () => {
  return (
    <>
      <Header hideCreateButton={true} />
      <InputForm />
    </>
  );
};

export default CreateStudyPage;
