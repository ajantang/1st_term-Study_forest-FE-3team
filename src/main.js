import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";

function Main() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Main;
