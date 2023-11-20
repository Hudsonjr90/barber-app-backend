import openingHours from "../models/OpeningHours.js";

const createOpeningHours = (body) => openingHours.create(body);
const allOpeningHours = () => openingHours.find();

export default { createOpeningHours, allOpeningHours };
