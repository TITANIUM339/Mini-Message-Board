import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse";

const messages = [];
const filePath = path.join(import.meta.dirname, "messages.csv");
const parser = fs
    .createReadStream(filePath)
    .on("error", () => {
        fs.writeFile(filePath, "name,message,date,location\n", (err) => {
            if (err) {
                console.error(err);
            }
        });
    })
    .pipe(parse());

(async () => {
    for await (const record of parser) {
        const [name, text, date, location] = record;

        messages.push({ name, text, date, location });
    }
})();

function addMessage(name, text, date, location) {
    const newMessage = `"${name}","${text}","${date}","${location}"\n`;

    messages.push({ name, text, date, location });
    
    fs.createWriteStream(filePath, { flags: "a" }).write(newMessage);
}

function getMessages() {
    return JSON.parse(JSON.stringify(messages.slice(1)));
}

export { addMessage, getMessages };
