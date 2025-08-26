"use client";

import { Note } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import {
  SidebarGroupContent as SidebarGroupContentShadCN,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import Fuse from "fuse.js";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";

type Props = {
  notes: Note[];
};

const SidebarGroupContent = ({ notes }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [localnotes, setLocalNotes] = useState(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localnotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localnotes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localnotes;

  const handleDeleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNote) => prevNote.filter((note) => note.id != noteId));
  };
  return (
    <SidebarGroupContentShadCN>
      <div className="relative m-2 flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input
          className="bg-muted pl-8"
          placeholder="Search your notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <SidebarMenu className="mt-4">
        {filteredNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />

            <DeleteNoteButton
              noteId={note.id}
              deleteNoteLocally={handleDeleteNoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  );
};

export default SidebarGroupContent;
