import express from "express";
import path from "node:path";
import indexRouter from "./routes/indexRouter.js";
import { format } from "date-fns";

const PORT = process.env.PORT || 80;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

app.use((req, res, next) => {
    const date = new Date();

    res.locals.date = date;

    console.log(`[${format(date, "yyy-MM-dd HH:mm:ss")}]`, req.method, req.url);
    next();
});
app.use(express.static(path.resolve("public")));
app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Serving on: http://localhost:${PORT}`));
