import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";

const routsWithAuth = ["", "signin", "callback", "session"];

export async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie"),
    },
  };
  //   @ts-expect-error - ignore this line
  const session = await getSession({ req: requestForNextAuth });
  // const session = "hello"
  const { pathname } = request.nextUrl;
  const paths = pathname.split("/");
  // console.log(session, paths);
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
