import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectsPage } from "./dashboard/ProjectsPage";
import { ProfilePage } from "./user/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ProjectsPage} />
        <Route path="/profile" Component={ProfilePage} />
      </Routes>
    </BrowserRouter>
  );
}

