import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            This website will return the current Google doodle image at <Link href="/api/doodle">/api/doodle</Link>
            <img src="/api/doodle/image" />
        </div>
    );
}
