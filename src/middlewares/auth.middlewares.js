import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";
dotenv.config();

export const authMiddlewares = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(401);
    }
    const parts = authorization.split(" ");

    const [schema, token] = parts;

    if (parts.length !== 2) {
      return res.status(401).send({ message: "invalid access" });
    }

    if (schema !== "Berear") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invalid" });
      }
      const user = await userService.findByIdService(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Invalid token" });
      }

      req.userId = user._id;

      return next();
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
