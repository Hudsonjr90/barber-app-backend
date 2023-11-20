// auth.service.js
import * as User from "../models/User.js";  // Importe tudo do módulo

export const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

export const generationToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 604800 });
