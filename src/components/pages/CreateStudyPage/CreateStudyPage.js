import Header from '../../Layout/Header.js';
import CreateStudy from './components/InputForm.js';

const CreateStudyPage = () => {
  return (
    <>
      <Header hideCreateButton={true} />
      <CreateStudy />
    </>
  );
};

export default CreateStudyPage;
