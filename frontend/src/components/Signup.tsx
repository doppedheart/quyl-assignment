import { submitSignup } from "@/api/user";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LabelInputContainer } from "./ui/label";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { BottomWarning } from "./BottomWarning";

export function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { toast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }
    const data = {
      username,
      email,
      password,
    };
    try {
      const response = await submitSignup(data);
      localStorage.setItem("token", response.data.token);
      toast({
        title: "Success",
        description: "New user created Successfully",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    navigate("/dashboard");
  };
  return (
    <div className="my-16 ">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          let&apos;s get you started with your account
        </p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Tyler"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm your Password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <BottomWarning
            label="Already have an account?"
            buttonText="Login"
            to="/login"
          />
        </form>
      </div>
    </div>
  );
}
