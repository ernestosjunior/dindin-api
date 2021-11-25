import { Request, Response } from "express";
import bcrypt from "bcrypt";
import knexInstance from "../../app/database";
import { User } from "../../app/database/interfaces";

export async function createUser(req: Request, res: Response) {
  const { fistName, lastName, email, password } = req.body;

  try {
    const users = await knexInstance<User>("users").select().where({ email });

    if (users.length) {
      return res
        .status(400)
        .json({ success: false, message: "E-mail already registered." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await knexInstance<User>("users").insert({
      first_name: fistName,
      last_name: lastName,
      email,
      password: hashPassword,
    });

    res.json(users);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
