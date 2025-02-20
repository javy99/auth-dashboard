import { Routes, Route } from "react-router";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import { ResetPasswordPage } from "./ResetPasswordPage";

// Main Authentication Container
export function AuthFlow() {
  return (
    <>
      <Route path="/login" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/forgot-password" Component={ForgotPasswordPage} />
      <Route path="/reset-password" Component={ResetPasswordPage} />
    </>
  );
}
