import React from "react";
import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-center text-3xl">SignUp</CardTitle>
        </CardHeader>

        <AuthForm type="signup" />
      </Card>
    </div>
  );
};

export default LoginPage;
