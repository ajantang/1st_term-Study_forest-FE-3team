import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";

function Main() {
  return (
    <>
      <Header hideCreateButton={true} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Main;
