// import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { MODAL_GOTO_HABIT, MODAL_GOTO_CONCENTRATION } from "./constants/global";
import "./styles/global.css";
import Main from "./main";
// import HomePage from "./components/pages/HomePage/HomePage";
// import CreateStudyPage from "./components/pages/CreateStudyPage/CreateStudyPage";
import ModifyPage from "./components/pages/ModifyPage/ModifyPage";
import StudyPage from "./components/pages/StudyPage/StudyPage";
// import TodatHabitPage from "./components/pages/TodayHabitPage/TodayHabitPage";
// import TodaysFocusPage from "./components/pages/TodaysFocusPage/TodaysFocusPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<p>home</p>} />
          {/* <Route path="create" element={<CreateStudyPage />} /> */}
          <Route path="/study/:studyId" element={<StudyPage />}></Route>
          <Route
            path="/study/:studyId/todayHabit"
            element={
              <ProtectedRoute modalType={MODAL_GOTO_HABIT}>
                <p>study/:studyId/todayHabit</p>
              </ProtectedRoute>
            }
          />
          <Route
            path="/study/:studyId/todaysFocus"
            element={
              <ProtectedRoute modalType={MODAL_GOTO_CONCENTRATION}>
                <p>study/:studyId/todaysFocus</p>
              </ProtectedRoute>
            }
          />
          <Route path="/study/:studyId/modify" element={<ModifyPage />} />
          {/* <Route path="/" element={<HomePage />}>
          <Route path="create" element={<CreateStudyPage />} />
          <Route path="study/:studyId" element={<StudyPage />} />
          <Route
            path="study/:studyId/todayHabit"
            element={<TodatHabitPage />}
          />
          <Route
            path="study/:studyId/todaysFocus"
            element={<TodaysFocusPage />}
          />
        </Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
