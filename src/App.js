// import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import Main from "./main";
import HomePage from "./components/pages/HomePage/HomePage";
import CreateStudyPage from "./components/pages/CreateStudyPage/CreateStudyPage";
import StudyPage from "./components/pages/StudyPage/StudyPage";
import TodatHabitPage from "./components/pages/TodayHabitPage/TodayHabitPage";
import TodaysFocusPage from "./components/pages/TodaysFocusPage/TodaysFocusPage";
import PrivateRoute from "../src/utils/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<HomePage />} />
          <Route path="create" element={<CreateStudyPage />} />
          <Route path="study/:studyId">
            <Route index element={<StudyPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="todayHabit" element={<TodatHabitPage />} />
              <Route path="todaysFocus" element={<TodaysFocusPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="/" element={<p>home</p>}>
//           <Route path="create" element={<CreateStudyPage />} />
//           <Route path="study/:studyId" element={<StudyPage />} />
//           <Route element={<PrivateRoute />}>
//             <Route
//               path="study/:studyId/todayHabit"
//               element={<TodatHabitPage />}
//             />
//             <Route
//               path="study/:studyId/todaysFocus"
//               element={<TodaysFocusPage />}
//             />
//           </Route>
//         </Route> */}
//         <Route element={<Main />}>
//           <Route path="/" element={<HomePage />} />
//             <Route path="create" element={<CreateStudyPage />} />
//             <Route path="study/:studyId" element={<StudyPage />} />
//             <Route element={<PrivateRoute />}>
//               <Route
//                 path="study/:studyId/todayHabit"
//                 element={<TodatHabitPage />}
//               />
//               <Route
//                 path="study/:studyId/todaysFocus"
//                 element={<TodaysFocusPage />}
//               />
//             </Route>
//           </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
