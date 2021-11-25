import { Router } from "express";
import userRoutes from "./user.routes";
import loginRoutes from "./login.routes";

const routes: Router = Router();

routes.use("/user", userRoutes);
routes.use(loginRoutes);

export default routes;
