import { getMessages } from "../models/messages.js";

export default {
    get(req, res) {
        res.render("pages/index", {
            title: "Mini Message Board",
            messages: getMessages()
        });
    },
};
