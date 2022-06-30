import Head from "next/head";

export default function Home() {
    return (
        <div>
            This website will return the current Google doodle image at <a href="/api/doodle">/api/doodle</a>
            <img src="/api/doodle" />
        </div>
    );
}
