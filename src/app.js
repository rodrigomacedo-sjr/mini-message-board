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

app.get("/", (req, res) => {
  res.redirect("/message");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/message", messageRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
