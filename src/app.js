import express from "express";
import morgan from "morgan";
import messageRouter from "./routes/message.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get("/", (_, res) => {
  res.redirect("/message");
});

app.get("/about", (_, res) => {
  res.render("about", { title: "About" });
});

app.use("/message", messageRouter);

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  if (err.status === 404) {
    res.render("404", { title: "404" });
  } else {
    res.render("500", { title: "500" });
  }
});
