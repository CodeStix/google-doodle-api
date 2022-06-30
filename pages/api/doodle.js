import fetch from "isomorphic-fetch";

export default async function handler(req, res) {
    if (req.method === "GET") {
        let now = new Date();

        let response = await fetch(`https://www.google.com/doodles/json/${now.getFullYear()}/${now.getMonth() + 1}`);
        if (!response.ok) {
            console.error("Could not fetch doodles", await response.text());
            return res.status(400).end();
        }

        let data = await response.json();

        let currentDoodle;
        let currentDoodleDay = -1;
        for (let doodle of data) {
            let day = doodle.run_date_array[2];
            if (day <= now.getDate() && day > currentDoodleDay) {
                currentDoodle = doodle;
                currentDoodleDay = day;
            }
        }

        if (!currentDoodle) {
            console.error("Could not get current doodle", await res.text());
            return res.status(400).end();
        }

        let url = currentDoodle.alternate_url;
        let imageResponse = await fetch(url);

        if (!imageResponse.ok) {
            console.error("Could not download image", await res.text());
            return res.status(400).end();
        }

        let imageBlob = await imageResponse.blob();
        let imageBuffer = new Uint8Array(await imageBlob.arrayBuffer());

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.write(imageBuffer);
    } else {
        return res.status(405).end();
    }
}
