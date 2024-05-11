"use client";

import { User } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";

import { toAuthUser, useUser } from "@/utils/store/user";

export default function InitUser({ user }: { user: User | undefined }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useUser.setState({
        user: user ? toAuthUser(user) : undefined,
      });
    }

    initState.current = true;
  }, []);

  return null;
}
