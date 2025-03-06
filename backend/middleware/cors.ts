import { Context } from "../deps.ts";

export async function corsMiddleware(
  ctx: Context,
  next: () => Promise<unknown>
) {
  ctx.response.headers.set(
    "Access-Control-Allow-Origin",
    "http://localhost:5173"
  );
  ctx.response.headers.set("Access-Control-Allow-Credentials", "true");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  await next();
}
