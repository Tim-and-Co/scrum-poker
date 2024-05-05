"use client";

import { createBrowserClient } from "@/utils/supabase/browser";

const GHButton: React.FC = () => {
  const loginWithGH = () => {
    const supabase = createBrowserClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  return (
    <button
      onClick={loginWithGH}
      className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
    >
      Sign In With GitHub
    </button>
  );
};

export default GHButton;
