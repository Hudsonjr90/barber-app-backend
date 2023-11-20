import bcrypt from "bcrypt";
import { loginService, generationToken } from "../services/auth.service.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!user) {
      return res.status(404).send({ message: "User or Password not Found" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({ message: "user of Password not Found" });
    }

    const token = generationToken(user.id);

    res.send({ user, token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
