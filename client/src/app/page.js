import { createServerClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createServerClient();
  const { data } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">OHOHOHOH</h1>
      {!data.session?.user && <a href="/login">Login</a>}
    </main>
  );
}
