import { BrowserRouter, Route, Routes } from "react-router";
import { AuthFlow } from "./auth";
import { ProjectsPage } from "./dashboard/ProjectsPage";
import { ProfilePage } from "./user/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ProjectsPage} index />
        <Route path="/profile" Component={ProfilePage} />
        <AuthFlow />
      </Routes>
    </BrowserRouter>
  );
}
