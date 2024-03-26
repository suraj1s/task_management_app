import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const Navbar = async () => {
  const session = await getServerAuthSession();
  return (
    session && (
    <div className="flex flex-col sm:flex-row items-center justify-end py-5  gap-4">
      <div className="text-center text-xl text-white">
        {session && (
          <p>
            Logged in as
            <span className="pl-2 text-xl font-semibold capitalize text-blue-400">
              {session.user?.name}
            </span>
          </p>
        )}
      </div>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
    )
  );
};

export default Navbar;
