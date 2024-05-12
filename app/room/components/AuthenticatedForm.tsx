import { SubmitButton } from "@/components/submit-button";
import { createBrowserClient } from "@/utils/supabase/browser";
import { redirect } from "next/navigation";
import { AuthUser } from "@/utils/store/user";

export default function AuthenticatedForm({ user }: { user: AuthUser }) {
  const createRoom = async (formData: FormData) => {
    const supabase = createBrowserClient();

    const name = formData.get("name") as string;
    const manager_id = formData.get("manage_id") as string;
    const manager = formData.get("user_name") as string;

    const { error } = await supabase.from("room").insert({
      manager,
      manager_id,
      name,
      voting_options: ["1", "2", "3", "5", "8"], // TODO make changeable
    });
    if (!error) {
      redirect(`/room/${name}`);
    }

    // unique constraint error - name taken
    if (error.code === "23505") {
      alert("Could not create room, please try again");
    }
  };

  return (
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <label className="text-md" htmlFor="name">
        Name
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="name"
        placeholder="q2-scrum"
        required
      />
      <label className="text-md" htmlFor="user_name">
        Username
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="user_name"
        defaultValue={user.username}
        required
      />
      <input type="hidden" name="manager_id" value={user.id} />
      <SubmitButton
        formAction={createRoom}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        pendingText="Saving..."
      >
        Create Room
      </SubmitButton>
    </form>
  );
}
