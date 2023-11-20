import bookingService from "../services/booking.service.js";

const create = async (req, res) => {
  try {
    const { service, barber, date, hour } = req.body;

    if (!service || !barber || !date || !hour) {
      res.status(400).send("invalido campo input");
    }

    await bookingService.createBooking({
      service,
      barber,
      date,
      hour,
      user: req.userId,
    });

    res.status(201).send({
      message: "appointment scheduling successfully",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllBooking = async (req, res) => {
  try {
    const booking = await bookingService.findAllBooking();
    if (booking.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no registered booking!" });
    }
    res.send(booking);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = req.booking;

    res.send(booking);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, getAllBooking, deleteBooking };
