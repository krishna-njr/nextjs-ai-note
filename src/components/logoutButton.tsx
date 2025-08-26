"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { resolve } from "path";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/users";

function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const errorMessage = (await logoutAction()).errorMessage;

    if (!errorMessage) {
      toast.success("User is successfully logout !!!");
      router.push("/"); // home page :
    } else {
      toast.error(`something is wrong !!!`);
    }

    setLoading(false);
  };
  return (
    <Button
      className="w-32"
      onClick={handleLogout}
      variant="outline"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogoutButton;
