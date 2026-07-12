import { randomUUIDv7 } from "bun";
import db from "../db";

const getAll = (_, res) => {
  res.render("message/index", { title: "Messages", messages: db.getAll() });
};

const getById = (req, res, next) => {
  try {
    const result = db.getById(req.params.id);
    res.render("message/details", { title: "Details", message: result });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

const createForm = (_, res) => {
  res.render("message/create", { title: "Create " });
};

const create = (req, res, next) => {
  const message = {
    id: randomUUIDv7(),
    from: req.body.from,
    content: req.body.content,
    timestamp: Date.now(),
  };

  try {
    db.save(message);
  } catch (err) {
    err.status = 500;
    next(err);
    return;
  }

  res.redirect("/");
};

const deleteById = (req, res, next) => {
  try {
    db.deleteById(req.params.id);
  } catch (err) {
    err.status = 500;
    next(err);
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
