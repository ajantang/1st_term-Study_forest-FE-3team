import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Layout/Header";

function Main() {
const locatin = useLocation()

let hideCreateButton

if (locatin.pathname === '/') {
  hideCreateButton = false
} else {
  hideCreateButton = true
}


  return (
    <>
      <Header hideCreateButton={hideCreateButton}/>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Main;
