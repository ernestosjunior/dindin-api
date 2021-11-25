import { Router } from "express";
import { userControllers } from "../../app/controllers";

const userRoutes: Router = Router();

userRoutes.post("/new", userControllers.createUser);

export default userRoutes;
