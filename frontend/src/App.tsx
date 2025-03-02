import { BrowserRouter, Route, Routes } from "react-router";
import { AuthFlowLayout } from "./auth-flow/AuthFlowLayout";
import { ForgotPasswordPage } from "./auth-flow/ForgotPasswordPage";
import { LoginPage } from "./auth-flow/LoginPage";
import { RegisterPage } from "./auth-flow/RegisterPage";
import { ResetPasswordPage } from "./auth-flow/ResetPasswordPage";
import { AuthBoundary } from "./dashboard/AuthBoundary";
import { ProfilePage } from "./dashboard/ProfilePage";
import { ProjectsPage } from "./dashboard/ProjectsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthFlowLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<AuthBoundary />}>
          <Route element={<ProjectsPage />} index />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="profile/*" element={<ProfilePage />} />
          {/* Other protected routes */}
        </Route>

        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
