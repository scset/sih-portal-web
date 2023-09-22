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

export default function GetMeetingLink() {
  const [en1, setEn1] = useState("E23CSEU8851ad");
  const [en2, setEn2] = useState("E23CSEUbcf9b0");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const { data } = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/meeting/enrollment`,
      data: {
        teamMemberEnrollment1: en1,
        teamMemberEnrollment2: en2,
      },
    });

    localStorage.setItem(
      "user_data",
      JSON.stringify({ type: "TEAM", en1, en2, ...data.data })
    );

    setIsLoading(false);
    location.reload();
  };

  return (
    <div className={`grid place-items-center min-h-[100vh]`}>
      <Card className="w-[400px]">
        <CardHeader className={`mb-2`}>
          <CardTitle className={`text-3xl mb-4`}>Get Meeting Links</CardTitle>
          <CardDescription className={`mb-4`}>
            Please enter enrollment numbers any 2 members of your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid items-center w-full gap-4 mb-8">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">First Enrollment Number</Label>
                <Input
                  id="name"
                  placeholder="First Enrollment Number"
                  value={en1}
                  onChange={(e) => {
                    setEn1(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Second Enrollment Number</Label>
                <Input
                  id="name"
                  placeholder="Second Enrollment Number"
                  value={en2}
                  onChange={(e) => {
                    setEn2(e.target.value);
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
            Get Meeting Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
