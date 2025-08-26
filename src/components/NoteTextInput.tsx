"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/notes";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout; // for debouncing :

const NoteTextInput = ({ noteId, startingNoteText }: Props) => {
  const noteIdparams = useSearchParams().get("noteId") || "";
  const { noteText, setNoteText } = useNote(); // through context api :

  useEffect(() => {
    if (noteIdparams === noteId) {
      setNoteText(startingNoteText);
    }
  }, [startingNoteText, noteIdparams, noteId]); //

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);

    clearTimeout(updateTimeout); // debouncing :
    updateTimeout = setTimeout(() => {
      updateNoteAction(noteId, text); //  sever action
    }, 1000);
  };
  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      placeholder="types your notes here..."
      className="placeholder:text-muted-foreground mb-4 h-full max-w-4xl resize-none border p-4 focus:ring-0 focus:outline-none"
    />
  );
};

export default NoteTextInput;
