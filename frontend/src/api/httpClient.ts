import ky, { HTTPError } from "ky";
import { useMemo } from "react";
import { useAccessToken } from "../AuthContext";
import { useRefreshToken } from "./auth";
import { API_BASE } from "./constants";

const privateHttpClient = ky.create({
  prefixUrl: API_BASE,
  timeout: false,
  retry: {
    limit: 2,
    // Add "401" and "post" to defaults, so that refetchToken can be called in `beforeRetry` hook
    statusCodes: [401, 408, 413, 429, 500, 502, 503, 504],
    methods: ["get", "post", "put", "head", "delete", "options", "trace"],
  },
});

export function usePrivateHttpClient() {
  const accessToken = useAccessToken();
  const refreshToken = useRefreshToken();

  return useMemo(
    () =>
      privateHttpClient.extend({
        hooks: {
          beforeRequest: [
            async (request) => {
              if (!request.headers.get("Authorization")) {
                request.headers.set("Authorization", `Bearer ${accessToken}`);
              }
            },
          ],

          beforeRetry: [
            async ({ error, request }) => {
              const isAuthError =
                error instanceof HTTPError && error?.response?.status === 401;

              if (isAuthError) {
                const newAccessToken = await refreshToken();
                request.headers.set(
                  "Authorization",
                  `Bearer ${newAccessToken}`
                );
              }
            },
          ],
        },
      }),
    [accessToken]
  );
}
