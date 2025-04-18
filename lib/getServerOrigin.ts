import { headers } from "next/headers";

export async function getServerOrigin() {
    const headersList = await headers();
    const host = headersList.get("host"); // e.g., 'localhost:3000'
    const protocol = headersList.get("x-forwarded-proto") || "http";

    if (!host) {
        throw new Error("Host header is missing");
    }

    return `${protocol}://${host}`;
}
