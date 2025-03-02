import { LayoutDashboardIcon, LogOutIcon, UserCircleIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg h-screen sticky top-0 left-0 w-[240px] py-6 px-4 font-[sans-serif] overflow-y-auto">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-100" : ""
              } text-black hover:text-blue-600 text-[15px] flex gap-2 items-center hover:bg-blue-50 rounded px-4 py-2.5 transition-all`
            }
          >
            <LayoutDashboardIcon />
            <span>Projects</span>
          </NavLink>
        </li>
      </ul>

      <div className="mt-4">
        <h6 className="text-blue-600 text-sm font-bold px-4">Actions</h6>

        <ul className="mt-2">
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-100" : ""
                } text-black hover:text-blue-600 text-[15px] flex gap-2 items-center hover:bg-blue-50 rounded px-4 py-2.5 transition-all`
              }
            >
              <UserCircleIcon />
              <span>Profile</span>
            </NavLink>
          </li>

          <li>
            <a
              onClick={() => navigate("/login")}
              className="text-black hover:text-blue-600 text-[15px] flex gap-2 items-center hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
            >
              <LogOutIcon />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
