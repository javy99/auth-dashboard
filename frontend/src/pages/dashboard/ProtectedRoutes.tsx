import ky from "ky";
import { useQuery } from "react-query";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAccessToken, useSetAccessToken } from "../../AuthContext";
import { DashboardLayout } from "../../components/DashboardLayout";
import { API_BASE } from "../../data/httpClient";

export function ProtectedRoutes() {
  const accessToken = useAccessToken();
  const setAccessToken = useSetAccessToken();
  const location = useLocation();

  const refreshTokenQuery = useQuery({
    enabled: !accessToken,
    retry: false,
    queryKey: ["refresh-token"],
    queryFn: () =>
      ky
        .post<{ accessToken: string }>(`${API_BASE}/refresh`, {
          credentials: "include",
        })
        .json(),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
  });

  if (refreshTokenQuery.isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl animate-pulse">Loading...</h1>
      </div>
    );

  if (refreshTokenQuery.error) {
    console.error(refreshTokenQuery.error);
    return <Navigate to={`/login?backUrl=${location.pathname}`} replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
