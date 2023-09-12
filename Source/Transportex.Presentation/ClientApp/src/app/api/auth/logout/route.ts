import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth"
import { getIdToken } from "@/common/utils/sessionTokenAccessor";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (session) {
        const idToken = await getIdToken();

        // this will log out the user on Keycloak side
        var url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL ?? "")}`;

        try {
            const resp = await fetch(url, { method: "GET" });
        } catch (err) {
            console.error(err);
            const errData = { status: 500 };
            const errBody: BodyInit = JSON.stringify(errData);
            return new Response(errBody);
        }
    }

    const data = { status: 200 };
    const body: BodyInit = JSON.stringify(data);
    return new Response(body);
}