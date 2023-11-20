import pg from 'pg';
import userService from "../services/user.service.js";
import bookingService from "../services/booking.service.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!pg.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Id" });
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findByIdService(id);

    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validHours = async (req, res, next) => {
  try {
    const hour = req.body.hour;
    const date = req.body.date;
    const booking = await bookingService.findAllBooking();

    let reservedTime = [];

    booking.find((book) => {
      if (book.hour === hour && book.date === date) {
        return reservedTime.push(book.hour);
      }
    });

    if (reservedTime.length > 0) {
      return res.status(400).send({ message: "unavailable time" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const booking = await bookingService.cancelBooking(id);

    if (!booking) {
      return res.status(400).send({ message: "booking not found" });
    }

    req.id = id;
    req.booking = booking;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
