import fetch from "isomorphic-fetch";
import { getCurrentDoodle } from "../../../doodle";

export default async function handler(req, res) {
    if (req.method === "GET") {
        let currentDoodle = await getCurrentDoodle();

        if (!currentDoodle) {
            console.error("Could not get current doodle", await res.text());
            return res.status(400).end();
        }

        res.json(currentDoodle);
    } else {
        return res.status(405).end();
    }
}
