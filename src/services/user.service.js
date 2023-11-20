// Seu arquivo que está gerando o erro
import * as User from "../models/User.js";  // Importe tudo do módulo

const create = (body) => User.create(body);
const findAllService = () => User.findAllService();
const findByIdService = (id) => User.findByIdService(id);
const updateService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.updateService(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

export default { create, findAllService, findByIdService, updateService };
