import Header from "../../Layout/Header.js";
import RecentlyView from "./components/RecentlyView.js";
import StudyList from "./components/StudyList.js";

const HomePage = () => {
  return (
    <>
      <Header hideCreateButton={false} />
      <RecentlyView />
      <StudyList />
    </>
  );
};

export default HomePage;
