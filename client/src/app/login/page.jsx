"use client";

import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const handleLoginWithGH = () => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };
  return (
    <div>
      <button onClick={handleLoginWithGH}>Sign in with Github</button>
    </div>
  );
}
