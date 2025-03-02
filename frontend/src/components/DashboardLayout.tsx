import { PropsWithChildren } from "react";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
