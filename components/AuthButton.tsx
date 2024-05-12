import { toAuthUser } from "@/utils/store/user";
import { createServerClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const signOut = async () => {
    "use server";

    const supabase = createServerClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  const user = session ? toAuthUser(session.user) : undefined;

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user?.username}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
