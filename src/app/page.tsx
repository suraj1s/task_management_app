import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

const page = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="pt-5">
      {session ? (
        <Link
          href="/home"
          className="rounded-full bg-white/10 px-4 py-2  text-sm font-semibold no-underline transition hover:bg-white/20"
        >
          Go To Home Page
        </Link>
      ) : (
        <p className="p-10 text-center text-3xl flex items-center  justify-center font-semibold">
          You are not logged in. Please
          <Link
            href="/api/auth/signin"
            className="rounded-full bg-white/10  mx-5 px-4 py-2 text-sm font-semibold no-underline transition hover:bg-white/20"
          >
            {" "}
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
};

export default page;
