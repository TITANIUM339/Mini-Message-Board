import { getMessage, getMessages } from "../models/queries.js";
import { format } from "date-fns";
import CustomError from "../helpers/CustomError.js";

export default {
    async getIndex(req, res, next) {
        try {
            const messages = await getMessages();

            res.render("pages/index", {
                title: "Mini Message Board",
                messages,
            });   
        } catch (error) {
            console.error(error);
            
            next(
                new CustomError(
                    "Internal Server Error",
                    "Something unexpected has occurred. Try reloading the page.",
                    500,
                ),
            );
        }
    },
    async getMessage(req, res, next) {
        const id = Number(req.params.id);

        if (!isFinite(id) || id > (2 ** 32 - 1) || id < 1) {
            next("router");
            return;
        }

        try {
            const message = await getMessage(id);

            if (!message) {
                next("router");
                return;
            }

            message.date = format(message.date, "yyy-MM-dd HH:mm 'UTC'");

            res.render("pages/message", {
                message,
            });
        } catch (error) {
            console.error(error);
            
            next(
                new CustomError(
                    "Internal Server Error",
                    "Something unexpected has occurred. Try reloading the page.",
                    500,
                ),
            );
        }
    },
};
