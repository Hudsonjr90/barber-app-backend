import Service from "../models/Service.js";
const createService = (body) => Service.create(body);
const AllService = () => Service.find();

export default { createService, AllService };
