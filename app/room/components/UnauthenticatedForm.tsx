import { v4 as uuid } from "uuid";
import { SubmitButton } from "@/components/submit-button";
import { createBrowserClient } from "@/utils/supabase/browser";
import { redirect } from "next/navigation";

export default function UnauthenticatedForm() {
  const createRoom = async (formData: FormData) => {
    const supabase = createBrowserClient();

    const manager = formData.get("user_name") as string;
    let attempts = 5;

    while (attempts > 0) {
      attempts -= 1;
      const roomId = uuid().slice(0, 7);

      const { error } = await supabase.from("room").insert({
        manager,
        name: roomId,
        voting_options: ["1", "2", "3", "5", "8"], // TODO make changeable
      });
      if (!error) {
        redirect(`/room/${roomId}`);
      }

      // unique constraint error - name taken
      if (error.code !== "23505") {
        alert("Could not create room, please try again");
        break;
      }
    }
  };

  return (
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <label className="text-md" htmlFor="user_name">
        Username
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="user_name"
        placeholder="jamie"
        required
      />
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
