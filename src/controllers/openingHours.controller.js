import openingHoursService from "../services/openingHours.js";

const createHours = async (req, res) => {
  try {
    const { hours } = req.body;

    if (!hours) {
      res.status(400).send("invalido campo input");
    }

    const openingHours = await openingHoursService.createOpeningHours(req.body);
    if (!openingHours) {
      return res.status(400).send({ message: "Error send hours" });
    }

    res.status(201).send({
      message: "opening hours scheduling successfully",
      openingHours: {
        id: openingHours._id,
        hours,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllHours = async (req, res) => {
  try {
    const hours = await openingHoursService.allOpeningHours();
    if (hours.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no registered Hours!" });
    }

    res.send(hours);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { createHours, getAllHours };
