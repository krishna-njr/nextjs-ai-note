"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getUser } from "@/auth/server";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createNewNoteaction } from "@/actions/notes";
import { toast } from "sonner";

type Props = {
  user: User | null;
};
const NewNoteButton = ({ user }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNewNote = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);
      const uuid = uuidv4();

      toast.success("saving your current note!!!"); // current saving :
      await new Promise((resolve) => setTimeout(resolve, 2000)); // sleep function :

      await createNewNoteaction(uuid); // server action :
      router.push(`/?noteId=${uuid}`);

      toast.success("creating new note *_*"); // then creating new note :
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleNewNote}
      variant="secondary"
      disabled={loading}
      className="w-30"
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
};

export default NewNoteButton;
