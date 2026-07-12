import { randomUUIDv7 } from "bun";
import db from "../db";

const getAll = (req, res) => {
  res.render("message/index", { title: "Messages", messages: db.getAll() });
};

const getById = (req, res) => {
  try {
    const result = db.getById(req.params.id);
    res.render("message/details", { title: "Details", message: result });
  } catch (err) {
    // TODO: raise a not found error and let an express layer handle this
    res.status(404).render("404", { title: "404" });
  }
};

const createForm = (req, res) => {
  res.render("message/create", { title: "Create " });
};

const create = (req, res) => {
  const message = {
    id: randomUUIDv7(),
    from: req.body.from,
    content: req.body.content,
    timestamp: Date.now(),
  };

  try {
    db.save(message);
  } catch (err) {
    res.status(500).send(err);
  }

  res.redirect("/");
};

const deleteById = (req, res) => {
  try {
    const result = db.deleteById(req.params.id);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
  res.json({ redirect: "/" });
};

export default {
  getAll,
  getById,
  createForm,
  create,
  deleteById,
};
