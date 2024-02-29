"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";

import { Button } from "../../components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/card";
import { Input } from "../../components/input";
import { Label } from "../../components/label";

export const MentorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const { data } = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/mentor/login`,
      data: {
        email,
        password,
      },
    });

    localStorage.setItem("mentor_id", data.mentor.id);

    setIsLoading(false);
    location.reload();
  };

  return (
    <div className={`grid place-items-center min-h-[100vh]`}>
      <Card className="w-[400px]">
        <CardHeader className={`mb-2`}>
          <CardTitle className={`text-3xl mb-4`}>Mentor Login</CardTitle>
          <CardDescription className={`mb-4`}>
            Please enter your Bennett Email Address and the password provided on
            your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid items-center w-full gap-4 mb-8">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email Address</Label>
                <Input
                  id="email"
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end mt-6">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
