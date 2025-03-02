import { BrowserRouter, Route, Routes } from "react-router";
import { AuthFlowLayout } from "./pages/auth-flow/AuthFlowLayout";
import { ForgotPasswordPage } from "./pages/auth-flow/ForgotPasswordPage";
import { LoginPage } from "./pages/auth-flow/LoginPage";
import { RegisterPage } from "./pages/auth-flow/RegisterPage";
import { ResetPasswordPage } from "./pages/auth-flow/ResetPasswordPage";
import { AuthBoundary } from "./pages/dashboard/AuthBoundary";
import { ProfilePage } from "./pages/dashboard/ProfilePage";
import { ProjectsPage } from "./pages/dashboard/ProjectsPage";

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
