import { router as authRouter } from "./auth.ts";
import { Application, Context, Router } from "./deps.ts";
import { authMiddleware } from "./middleware/auth.ts";
import { corsMiddleware } from "./middleware/cors.ts";

const app = new Application();

app.use(corsMiddleware);

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

const mainRouter = new Router();

mainRouter.get("/projects", authMiddleware, (ctx: Context) => {
  ctx.response.body = {
    projects: new Array(5).fill(0).map((_, i) => ({
      id: i,
      name: `Project ${i + 1}`,
    })),
  };
});

mainRouter.post("/echo", authMiddleware, (ctx: Context) => {
  ctx.response.body = ctx.request.body().value;
});

app.use(mainRouter.routes());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
