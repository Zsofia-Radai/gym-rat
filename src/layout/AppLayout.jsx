import { NavLink, Outlet } from "react-router-dom";
import layout from "./AppLayout.module.css";
import logo from "../resources/gym-rat-icon.png";
import { useLocation } from "react-router-dom";

function AppLayout() {
  const location = useLocation();

  const isSessionsPage = location.pathname.startsWith("/workout/sessions");

  return (
    <div className={`${layout.page} ${layout.medium}`}>
      <header className={layout.topbar}>
        <div className={layout.titleBlock}>
          <p className={layout.overline}>
            {isSessionsPage ? "History" : "Today"}
          </p>
          <h2 className={layout.title}>GymRat</h2>
        </div>
        <img className={layout.logo} src={logo} alt="GymRat logo"></img>
      </header>

      <nav className={layout.tabs} aria-label="Main navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${layout.tab} ${layout.activeTab}` : layout.tab
          }
        >
          Templates
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${layout.tab} ${layout.activeTab}` : layout.tab
          }
          to={"/workout/sessions"}
        >
          Sessions
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
