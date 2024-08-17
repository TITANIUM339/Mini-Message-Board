import express from "express";
import path from "node:path";
import indexRouter from "./routes/indexRouter.js";
import newRouter from "./routes/newRouter.js";
import { format } from "date-fns";
import CustomError from "./helpers/CustomError.js";

const PORT = process.env.PORT || 80;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));
app.set("trust proxy", true);

app.use((req, res, next) => {
    const date = new Date();

    res.locals.date = date;

    console.log(`[${format(date, "yyy-MM-dd HH:mm:ss")}]`, req.method, req.url);
    next();
});
app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));
app.use("/new", newRouter);
app.use("/", indexRouter);
app.use((req, res, next) =>
    next(
        new CustomError(
            "Not Found",
            "It seems that the page you were looking for does not exist.",
            404,
        ),
    ),
);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(err.statusCode).render("pages/error", { error: err });
});

app.listen(PORT, () => console.log(`Serving on: http://localhost:${PORT}`));
