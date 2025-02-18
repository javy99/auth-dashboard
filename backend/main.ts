import { router as authRouter } from "./auth.ts";
import { Application } from "./deps.ts";
import { corsMiddleware } from "./middleware/cors.ts";

const app = new Application();

app.use(corsMiddleware);

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
