import { addMessage } from "../models/messages.js";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import CustomError from "../helpers/CustomError.js";

export default {
    get(req, res) {
        res.render("pages/new");
    },
    async post(req, res, next) {
        const name = req.body.name.trim();
        const message = req.body.message.trim();

        if (!(message && name)) {
            next(
                new CustomError(
                    "Bad Request",
                    "You have provided an invalid name or message.",
                    400,
                ),
            );
            return;
        }

        let data;

        try {
            data = await (
                await fetch(
                    `http://ip-api.com/json/${req.ip}?fields=country,city`,
                )
            ).json();
        } catch {
            next(
                new CustomError(
                    "Internal Server Error",
                    "Something unexpected has occurred. Try sending the message again.",
                    500,
                ),
            );
            return;
        }

        const { country, city } = data;

        addMessage(
            name,
            message,
            format(new UTCDate(), "yyy-MM-dd HH:mm 'UTC'"),
            country && city ? `${country}, ${city}` : "Unknown",
        );

        res.redirect("/");
    },
};
