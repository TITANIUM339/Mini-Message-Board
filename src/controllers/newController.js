import { addMessage } from "../models/queries.js";
import CustomError from "../helpers/CustomError.js";
import { UTCDate } from "@date-fns/utc";

export default {
    get(req, res) {
        res.render("pages/new");
    },
    async post(req, res, next) {
        const name = req.body.name.trim().replaceAll(/\s+/g, " ");
        const message = req.body.message.trim().replaceAll(/\s+/g, " ");

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

        try {
            const { country, city } = await (
                await fetch(
                    `http://ip-api.com/json/${req.ip}?fields=country,city`,
                )
            ).json();

            await addMessage(
                name,
                message,
                new UTCDate(),
                country && city ? `${country}, ${city}` : "Unknown",
            );
        } catch (error) {
            console.error(error);
            
            next(
                new CustomError(
                    "Internal Server Error",
                    "Something unexpected has occurred. Try sending the message again.",
                    500,
                ),
            );
            return;
        }

        res.redirect("/");
    },
};
