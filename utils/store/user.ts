import { User } from "@supabase/supabase-js";
import { startCase } from "lodash";
import { create } from "zustand";

export type AuthUser = {
  id: string;
  username: string;
  email?: string;
  avatarUrl: string;
};

type UserState = {
  user: AuthUser | undefined;
};

export const toAuthUser = (user: User): AuthUser => ({
  id: user.id,
  username: startCase(user.user_metadata.user_name),
  email: user.email,
  avatarUrl: user.user_metadata.avatar_url,
});

export const useUser = create<UserState>()(() => ({
  user: undefined,
}));
