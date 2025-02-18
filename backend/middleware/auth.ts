import { Context } from "../deps.ts";
import { accessTokenJWT } from "../jwt.ts";

export async function authMiddleware(
  ctx: Context,
  next: () => Promise<unknown>
) {
  try {
    const authHeader = ctx.request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("No token provided");
    }

    const token = authHeader.split(" ")[1];
    const payload = await accessTokenJWT.verify(token);

    if (!payload) {
      throw new Error("Invalid token");
    }

    ctx.state.user = payload;
    await next();
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
  }
}
