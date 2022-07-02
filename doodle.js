import fetch from "isomorphic-fetch";

export async function getCurrentDoodle() {
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

    if (!currentDoodle.alternate_url) {
        return undefined;
    }

    return currentDoodle;
}
