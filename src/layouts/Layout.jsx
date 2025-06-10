import { Outlet } from "react-router";
import Nav from "../components/Nav";

function Layout() {
  return (
    <div className="pb-4">
      <Nav />
      <Outlet />
    </div>
  );
}

export default Layout;
