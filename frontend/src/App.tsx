import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthContext } from "./AuthContext";
import { AuthFlowLayout } from "./pages/auth-flow/AuthFlowLayout";
import { ForgotPasswordPage } from "./pages/auth-flow/ForgotPasswordPage";
import { LoginPage } from "./pages/auth-flow/LoginPage";
import { RegisterPage } from "./pages/auth-flow/RegisterPage";
import { ResetPasswordPage } from "./pages/auth-flow/ResetPasswordPage";
import { ProfilePage } from "./pages/dashboard/ProfilePage";
import { ProjectsPage } from "./pages/dashboard/ProjectsPage";
import { ProtectedRoutes } from "./pages/dashboard/ProtectedRoutes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthFlowLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route index element={<ProjectsPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="profile/*" element={<ProfilePage />} />
              {/* Other protected routes */}
            </Route>

            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </BrowserRouter>
      </AuthContext>
    </QueryClientProvider>
  );
}
