import booking from "../models/Booking.js";

const createBooking = (body) => booking.create(body);
const findAllBooking = () => booking.find();
const cancelBooking = (id) => booking.findByIdAndDelete(id);
export default { createBooking, findAllBooking, cancelBooking };
