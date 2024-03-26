import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "./env";
const routsWithAuth = ["", "signin", "callback", "session"];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(env.AUTH_SESSION_TOKEN)?.value ?? null;
  const { pathname } = request.nextUrl;
  const paths = pathname.split("/");
  if (session) {
    if (
      //   @ts-expect-error - ignore this line
      routsWithAuth.includes(paths[1]) ||
      (paths[3] && routsWithAuth.includes(paths[3]))
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (
      //@ts-expect-error - ignore this line
      routsWithAuth.includes(paths[1]) ||
      (paths[3] && routsWithAuth.includes(paths[3]))
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }
  }
}

// export const config = {
//   matcher: "/:path*",
// };
export const config = { matcher: "/((?!.*\\.).*)" };
