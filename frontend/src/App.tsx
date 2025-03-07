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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: "always",
      staleTime: Infinity,
    },
    mutations: {
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContext>
          <Routes>
            <Route element={<AuthFlowLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/reset-password/:resetToken"
                element={<ResetPasswordPage />}
              />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route index element={<ProjectsPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="profile/*" element={<ProfilePage />} />
              {/* Other protected routes */}
            </Route>

            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </AuthContext>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
