"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { ArrowUpIcon, Loader2 } from "lucide-react";
import { Fragment, useRef, useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { askAiAboutNotesAction } from "@/actions/notes";

type Props = {
  user: User | null;
};
const AskAiButton = ({ user }: Props) => {
  const router = useRouter(); // next/navigation :

  const [isPending, startTransition] = useTransition();

  const [questionText, setQuestionText] = useState("");

  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestions([]);
        setResponses([]);
      }
      setOpen(isOpen);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    ((textarea.style.height = "auto"),
      (textarea.style.height = `${textarea.scrollHeight}px`));
  };

  const handleSubmit = () => {
    // does all the model/llm work :
    if (!questionText) return;

    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAiAboutNotesAction(newQuestions, responses);
      setResponses((prev) => [...prev, response]);
      //   console.log(response);
      setTimeout(scrollToBottom, 100);
    });
    // console.log("submit");
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(); // **************
    }
  };

  const handleClickInput = () => {
    textareaRef.current?.focus();
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-30" variant="secondary">
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={contentRef}
        className="flex h-[75vh] flex-col overflow-y-auto sm:max-w-4xl"
      >
        <DialogHeader>
          <DialogTitle>Ask Ai About Your Notes.</DialogTitle>
          <DialogDescription>
            AI can answer your all the question regarding your notes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {questions.map((question, index) => (
            <Fragment key={index}>
              <p className="bg-muted text-muted-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm">
                {question}
              </p>
              {responses[index] && (
                <p
                  className="text-muted-foreground text-sm"
                  dangerouslySetInnerHTML={{ __html: responses[index] }}
                />
              )}
            </Fragment>
          ))}
          {isPending && <p className="animate-pulse text-sm">Thinking....</p>}
        </div>

        <div
          className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
          onClick={handleClickInput}
        >
          <Textarea
            ref={textareaRef}
            placeholder="Ask me anything about your notes...."
            className="placeholder:text-muted-foreground resize-none rounded-none border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{
              height: "0",
              lineHeight: "normal",
              background: "transparent", // *****
            }}
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          <Button className="ml-auto size-8 animate-pulse rounded-full">
            <ArrowUpIcon className="text-background" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AskAiButton;
