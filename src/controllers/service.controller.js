import serviceService from "../services/service.service.js";

const create = async (req, res) => {
  try {
    const { name, slug, price, info } = req.body;
    if (!name || !slug || !price || !info) {
      res.status(400).send("invalido campo input");
    }
    const service = await serviceService.createService(req.body);

    if (!service) {
      return res.status(400).send({ message: "Error creating Service" });
    }

    res.status(201).send({
      message: "Service created sucessufuly",
      service: {
        id: service._id,
        name,
        slug,
        price,
        info,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllServices = async (req, res) => {
  try {
    const services = await serviceService.AllService();
    if (services.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no registered Services!" });
    }
    res.send(services);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAllServices };
