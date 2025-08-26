"use client";
import { Note } from "@prisma/client";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useNote from "@/hooks/useNote";

type Props = {
  note: Note;
};

const SelectNoteButton = ({ note }: Props) => {
  const noteId = useSearchParams().get("noteId") || "";

  const [text, setText] = useState("EMPTY NOTE");

  const { noteText: globalNoteText } = useNote(); // globle note :

  useEffect(() => {
    if (note.id === noteId)
      setText(globalNoteText || "EMPTY NOTE"); // globle note :
    else setText(note.text || "EMPTY NOTE"); // local note
  }, [globalNoteText]);

  useEffect(() => {
    setText(note.text);
  }, [note.text]);

  return (
    <SidebarMenuButton
      className={`items-start gap-0 pr-12 ${note.id === noteId && "bg-sidebar-accent/50"}`}
      asChild
    >
      <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
        <p className="w-full truncate">{text}</p>
        <p className="text-muted-foreground">
          {note.updateAt.toLocaleDateString()}
        </p>
      </Link>
    </SidebarMenuButton>
  );
};

export default SelectNoteButton;
