import { Outlet } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";

export function AuthBoundary() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
