"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";

import { Button } from "../../components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/popover";
import { SelectSpecialization } from "../select-specialization";

export const MentorInfo = () => {
  const [specialization, setSpecialization] = useState<undefined | string>(
    undefined
  );
  const [meetingUrl, setMeetingUrl] = useState<undefined | string>(undefined);

  const handleSubmit = async (specializationId: string | undefined) => {
    if (!specializationId) return;

    const { data } = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/queue/next`,
      data: { specialization: specializationId },
    });

    setMeetingUrl(data.data);
  };

  return (
    <div className={`grid place-items-center min-h-[100vh] my-20`}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className={`text-3xl`}>Mentor&apos;s Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`mt-8`}>
            <strong>Note:</strong>
            <p className={`ml-3`}>
              <ol>
                <li className={`my-4`}>1. Do not try to spam the button.</li>
                <li>2. Bla Bla Bla</li>
              </ol>
            </p>
          </div>

          <div className={`my-8`}>
            <hr />
          </div>

          <div>
            <div className="flex justify-between">
              <h1 className={`text-xl font-semibold`}>Select Specialization</h1>
              <Popover>
                <PopoverTrigger>
                  <InfoCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque, reiciendis magnam laudantium atque mollitia sit
                  distinctio amet corporis voluptatem officia quo deserunt eum,
                  porro numquam vero unde ipsum nam repudiandae.
                </PopoverContent>
              </Popover>
            </div>
            <p className={`my-4 text-slate-500`}>
              Select the specialization that you are interested to mentor
            </p>

            <div>
              <SelectSpecialization
                value={specialization}
                onValueChange={(val) => setSpecialization(val)}
              />

              <div className="flex justify-between mt-5">
                <Button
                  onClick={() => {
                    handleSubmit(specialization);
                  }}
                  disabled={!specialization}
                >
                  Find Meeting
                </Button>

                <a href={meetingUrl} target="_blank">
                  <Button disabled={!meetingUrl}>Open Meeting</Button>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
