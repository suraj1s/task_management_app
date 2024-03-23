import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import CategoryList from "~/components/category/CategoryList";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main className="">
      <div className=" flex gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center  gap-4">
            <p className="text-center text-xl text-white">
              {session && (
                <p>
                  Logged in as
                  <span className="font-semibold text-blue-400 pl-2 capitalize text-xl">
                    {session.user?.name}
                  </span>
                </p>
              )}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
      <CategoryList />
    </main>
  );
}
