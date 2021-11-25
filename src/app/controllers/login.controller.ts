import { Request, Response } from "express";
import { loginSchemas } from "../validations";
import knexInstance from "../database";
import { User } from "../database/interfaces";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const { error } = loginSchemas.login.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, error });
    }

    const user = await knexInstance<User>("users")
      .select()
      .where({ email })
      .first();

    if (!user) {
      return res.status(400).json({ success: false, error: "User not found." });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
