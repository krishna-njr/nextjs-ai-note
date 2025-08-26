"use client";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { error } from "node:console";
import { loginAction, signupAction } from "@/actions/users";
import { useRouter, redirect } from "next/navigation";

type Props = {
  type: "signup" | "login";
};

const AuthForm = ({ type }: Props) => {
  const isLoginForm = type === "login";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formdate: FormData) => {
    startTransition(async () => {
      const email = formdate.get("email") as string;
      const password = formdate.get("password") as string;

      let errorMessage;
      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
      } else {
        errorMessage = (await signupAction(email, password)).errorMessage;
      }

      if (!errorMessage) {
        toast.success(`User is Successfully ${type}`);
      } else {
        toast.error(`something is wrong !!!`);
      }

      router.push("/");
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            className="mt-2"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            className="mt-2"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>

      <CardFooter className="mt-5 w-full">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
      </CardFooter>
      <p className="mt-3 text-center">
        {isLoginForm
          ? "Don't have an account yet?"
          : "Already have an account? "}{" "}
        <Link
          href={isLoginForm ? "/signup" : "/login"}
          className={`text-blue-400 underline ${isPending ? "pointer-events-none" : ""}`}
        >
          {isLoginForm ? "Signup" : "Login"}
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;
