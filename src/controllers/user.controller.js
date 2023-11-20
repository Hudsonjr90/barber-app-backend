// const userService = require("../services/user.service");

import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).send("invalido campo input");
    }
    const user = await userService.create(req.body);
    if (!user) {
      return res.status(400).send({ message: "Error creating user" });
    }

    res.status(201).send({
      message: "user created sucessufuly",
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no registered users!" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send("submit at least one field for upadte");
    }

    const { user, id } = req;

    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    res.send({ message: "user sucessfully update" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAllUsers, findById, update };
