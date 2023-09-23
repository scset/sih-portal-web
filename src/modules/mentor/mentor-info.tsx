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

import { SPECIALIZATION } from "../../lib/constants";
import { useOnceCall } from "../../hooks/use-once-call";

export const MentorInfo = () => {
  const [specialization, setSpecialization] = useState<undefined | string>(
    undefined
  );
  const [meetingUrl, setMeetingUrl] = useState<undefined | string>(undefined);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isOpenMeetingBtnDisabled, setIsOpenMeetingBtnDisabled] =
    useState(true);
  const [queueId, setQueueId] = useState<undefined | string>(undefined);

  // useOnceCall(() => {
  //   const userDataString = localStorage.getItem("user_data");
  //   if (!userDataString) return;
  //   const userData = JSON.parse(userDataString);

  //   if (userData.queue) {
  //     setSpecialization(userData.specializationId);
  //   }
  // });

  const handleSubmit = async (specializationId: string | undefined) => {
    if (!specializationId) return;

    const res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/queue/next`,
      data: { specialization: specializationId },
    });

    const data = res.data.data;

    if (data == "") {
      alert(
        `There is no pending mentor request for ${
          Object.entries(SPECIALIZATION).find(
            ([id, _name]) => id === specializationId
          )?.[1]
        }`
      );

      return;
    }

    const url = data.meetingLink;

    setMeetingUrl(url);
    setIsOpenMeetingBtnDisabled(!url);
    setQueueId(data.queueItem.id);
  };

  const handleFinishMeeting = async (queueId: string | undefined) => {
    if (!queueId) return;

    // const mentorDataString = localStorage.getItem("mentor_data");
    // if (!mentorDataString) return;
    // const mentorData = JSON.parse(mentorDataString);

    await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/queue/delete`,
      data: { queueId },
    });

    setQueueId(undefined);

    // localStorage.setItem(
    //   "mentor_data",
    //   JSON.stringify({ ...mentorData, queue: undefined })
    // );
  };

  return (
    <div className={`grid place-items-center min-h-[100vh] my-20`}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className={`text-3xl`}>Mentor&apos;s Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`mt-8`}>
            <strong>How to use</strong>
            <p className={`ml-3`}>
              <ol>
                <li className={`my-4`}>
                  1. Select your specialization and click on &quot;Find
                  Meeting&quot; button.
                </li>
                <li className={`my-4`}>
                  2. If a meeting is available, you will be able to click the
                  &quot;Open Meeting&quot; button.
                </li>
                <li>
                  3. After you are done with your meeting, please click the
                  &quot;Finish Meeting&quot; button, to close the student
                  request.
                </li>
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
                onValueChange={(val) => {
                  setSpecialization(val);
                  setIsOpenMeetingBtnDisabled(true);
                }}
              />

              <div className="flex justify-between mt-5">
                <Button
                  onClick={async () => {
                    await handleSubmit(specialization);
                  }}
                  disabled={!specialization}
                >
                  Find Meeting
                </Button>

                {!isInMeeting ? (
                  <Button
                    disabled={isOpenMeetingBtnDisabled}
                    onClick={() => {
                      setIsInMeeting(true);
                    }}
                  >
                    <a
                      href={isOpenMeetingBtnDisabled ? "#" : meetingUrl}
                      target="_blank"
                    >
                      Open Meeting
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setIsInMeeting(false);
                      handleFinishMeeting(queueId);
                    }}
                  >
                    Finish Meeting
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
