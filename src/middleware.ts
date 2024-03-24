import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getSession } from "next-auth/react";
// const routsWithAuth = ["", "auth"];

// export async function middleware(request: NextRequest) {
export async function middleware() {
  return NextResponse.next();

  // const requestForNextAuth = {
  //   headers: {
  //     cookie: request.headers.get("cookie"),
  //   },
  // };
  // //   @ts-expect-error - session is not defined
  // const session = await getSession({ req: requestForNextAuth });
  // const { pathname } = request.nextUrl;
  // // console.log(session, "this is session");
  // // console.log(pathname, "this is pathname")
  // const paths = pathname.split("/");
  // if (paths[1]) {
  //   if (session) {
  //     if (routsWithAuth.includes(paths[1])) {
  //       return NextResponse.redirect(new URL("/home", request.url));
  //     } else {
  //       return NextResponse.next();
  //     }
  //   } else {
  //     if (routsWithAuth.includes(paths[1])) {
  //       return NextResponse.next();
  //     } else {
  //       return NextResponse.redirect(new URL("", request.url));
  //     }
  //   }
  // }
}

export const config = {
  matcher: "/:path*",
};
