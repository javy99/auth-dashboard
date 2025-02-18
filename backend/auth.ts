import { Router, Context, bcrypt } from "./deps.ts";
import { DB } from "./db.ts";
import { accessTokenJWT, refreshTokenJWT } from "./jwt.ts";
import { authMiddleware } from "./middleware/auth.ts";
import { CONFIG } from "./config.ts";

interface TokenSignPayload {
  userId: string;
  email: string;
}

const db = new DB();

export const router = new Router();

router.post("/register", async (ctx: Context) => {
  const body = await ctx.request.body().value;
  const { email, password } = body;

  if (db.getUser(email)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "User already exists" };
    return;
  }

  const hashedPassword = await bcrypt.hash(password);
  const user = db.createUser(email, hashedPassword);

  const accessToken = await accessTokenJWT.sign(
    { userId: user.id, email },
    CONFIG.ACCESS_TOKEN_EXPIRES_IN
  );

  const refreshToken = await refreshTokenJWT.sign(
    { userId: user.id, email },
    CONFIG.REFRESH_TOKEN_EXPIRES_IN
  );

  db.storeRefreshToken(refreshToken);

  ctx.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: true,
    sameSite: "strict",
    path: "/",
  });

  ctx.response.status = 201;
  ctx.response.body = {
    user: { id: user.id, email },
    accessToken,
  };
});

router.post("/login", async (ctx: Context) => {
  const body = await ctx.request.body().value;
  const { email, password } = body;

  const user = db.getUser(email);
  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid credentials" };
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid credentials" };
    return;
  }

  const accessToken = await accessTokenJWT.sign(
    { userId: user.id, email },
    15 * 60
  );

  const refreshToken = await refreshTokenJWT.sign(
    { userId: user.id, email },
    7 * 24 * 60 * 60
  );

  db.storeRefreshToken(refreshToken);

  ctx.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  ctx.response.body = {
    user: { id: user.id, email },
    accessToken,
  };
});

router.post("/refresh", async (ctx: Context) => {
  const refreshToken = await ctx.cookies.get("refreshToken");

  if (!refreshToken || !db.isValidRefreshToken(refreshToken)) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid refresh token" };
    return;
  }

  const payload = (await refreshTokenJWT.verify(
    refreshToken
  )) as TokenSignPayload;

  if (!payload) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid refresh token" };
    return;
  }

  // Token rotation
  db.removeRefreshToken(refreshToken);

  const newAccessToken = await accessTokenJWT.sign(
    { userId: payload.userId, email: payload.email },
    CONFIG.ACCESS_TOKEN_EXPIRES_IN
  );

  const newRefreshToken = await refreshTokenJWT.sign(
    { userId: payload.userId, email: payload.email },
    CONFIG.REFRESH_TOKEN_EXPIRES_IN
  );

  db.storeRefreshToken(newRefreshToken);

  ctx.cookies.set("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  ctx.response.body = { accessToken: newAccessToken };
});

router.post("/logout", async (ctx: Context) => {
  const refreshToken = await ctx.cookies.get("refreshToken");
  if (refreshToken) {
    db.removeRefreshToken(refreshToken);
  }

  ctx.cookies.delete("refreshToken");
  ctx.response.body = { message: "Logged out successfully" };
});

router.get("/me", authMiddleware, async (ctx: Context) => {
  const user = db.getUserById(ctx.state.user.userId);
  if (!user) {
    ctx.response.status = 404;
    ctx.response.body = { error: "User not found" };
    return;
  }

  ctx.response.body = {
    user: { id: user.id, email: user.email },
  };
});
