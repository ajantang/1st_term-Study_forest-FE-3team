import { useState } from 'react';
import RecentlyView from './components/RecentlyView.js';
import StudyList from './components/StudyList.js';
import LodingPage from '../../Layout/LodingPage.js';


const HomePage = () => {
  const [loding, setLoding] = useState(false)

  return (
    <>
      <RecentlyView setLoding={setLoding}/>
      <StudyList />
      {loding && <LodingPage />}
    </>
  );
};

export default HomePage;
 