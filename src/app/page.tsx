// "use client";
import { getUser } from "@/auth/server";
import AskAiButton from "@/components/AskAiButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/db/prisma";
import React from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Homepage = async ({ searchParams }: Props) => {
  const noteIdParams = (await searchParams).noteId;

  const user = await getUser();

  const noteId = Array.isArray(noteIdParams)
    ? noteIdParams![0]
    : noteIdParams || "";

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      authorId: user?.id,
    },
  });

  return (
    <div className="max-h-3xl border- flex h-full w-full flex-col items-center border-yellow-400">
      <div className="border- m-3 flex w-full max-w-4xl justify-end gap-3">
        <AskAiButton user={user} />
        <NewNoteButton user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </div>
  );
};

export default Homepage;
