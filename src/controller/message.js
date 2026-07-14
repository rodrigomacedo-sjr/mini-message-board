import db from "../db/db.js";

const getAll = async (_, res) => {
  res.render("message/index", { title: "Messages", messages: await db.getAll() });
};

const getById = async (req, res, next) => {
  try {
    const result = await db.getById(req.params.id);
    res.render("message/details", { title: "Details", message: result });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

const createForm = (_, res) => {
  res.render("message/create", { title: "Create " });
};

const create = async (req, res, next) => {
  const message = {
    sender: req.body.sender,
    content: req.body.content,
  };

  try {
    await db.save(message);
  } catch (err) {
    err.status = 500;
    next(err);
    return;
  }

  res.redirect("/");
};

const deleteById = async (req, res, next) => {
  try {
    await db.deleteById(req.params.id);
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
