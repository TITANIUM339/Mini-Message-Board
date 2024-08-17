import { getMessages } from "../models/messages.js";

export default {
    getIndex(req, res) {
        res.render("pages/index", {
            title: "Mini Message Board",
            messages: getMessages(),
        });
    },
    getMessage(req, res, next) {
        const index = Number(req.params.index);
        const messages = getMessages();

        if (isNaN(index) || index < 0 || index >= messages.length) {
            next("router");
            return;
        }

        res.render("pages/message", { message: messages[index] });
    },
};
