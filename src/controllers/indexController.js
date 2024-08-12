import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";

const messages = [
    {
        name: "Amando",
        text: "Hi there!",
        date: format(new UTCDate(), "yyy-MM-dd HH:mm 'UTC'"),
        location: "Italy, Rome",
    },
    {
        name: "Charles",
        text: "Hello World!",
        date: format(new UTCDate(), "yyy-MM-dd HH:mm 'UTC'"),
        location: "Canada, Toronto",
    },
    {
        name: "Man",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam ligula, tempus quis mattis vel, congue in leo. Nam risus purus, fermentum et risus non, suscipit consequat ex. Proin dapibus nulla nulla, id commodo nulla tincidunt nec. Fusce libero sem, aliquam eget nunc eu, fringilla vehicula risus. Aliquam viverra consequat mattis. Fusce vel tellus turpis. Ut luctus ornare neque. Etiam pretium libero sed finibus ultrices. Mauris dignissim fermentum posuere.",
        date: format(new UTCDate(), "yyy-MM-dd HH:mm 'UTC'"),
        location: "MilkyWay, Earth",
    },
];

export default {
    get(req, res) {
        res.render("pages/index", {
            title: "Mini Message Board",
            messages,
        });
    },
};
