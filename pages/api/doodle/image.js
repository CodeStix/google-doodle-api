import fetch from "isomorphic-fetch";
import { getCurrentDoodle } from "../../../doodle";

export default async function handler(req, res) {
    if (req.method === "GET") {
        let currentDoodle = await getCurrentDoodle();

        if (!currentDoodle) {
            console.error("Could not get current doodle", currentDoodle);
            return res.status(400).end();
        }

        let url = currentDoodle.alternate_url;
        let imageResponse = await fetch(url);

        if (!imageResponse.ok) {
            console.error("Could not download image", await imageResponse.text());
            return res.status(400).end();
        }

        let imageBlob = await imageResponse.blob();
        let imageBuffer = new Uint8Array(await imageBlob.arrayBuffer());

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.write(imageBuffer);
        res.end();
    } else {
        return res.status(405).end();
    }
}
