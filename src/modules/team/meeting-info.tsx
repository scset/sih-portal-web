"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import copy from "copy-to-clipboard";
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
import { useOnceCall } from "../../hooks/use-once-call";
import { SPECIALIZATION } from "../../lib/constants";
import { SelectSpecialization } from "../select-specialization";
import { ScrollArea } from "../../components/scroll-area";

interface MeetingInfoProps {
  meetingLink: string;
}

export const MeetingInfo: React.FC<MeetingInfoProps> = ({ meetingLink }) => {
  const [specializationId, setSpecializationId] = useState<undefined | string>(
    undefined
  );
  const [isAlreadyInQueue, setIsAlreadyInQueue] = useState(false);
  const [queueId, setQueueId] = useState<undefined | string>(undefined);

  useOnceCall(async () => {
    const groupId = localStorage.getItem("group_id");
    console.log({ groupId });
    if (!groupId) return;

    const { data } = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/queue/find`,
      data: {
        groupId: groupId,
      },
    });

    const qi = data.data.queueItem;

    if (qi) {
      setSpecializationId(qi.specializationId);
      setQueueId(qi.id);
      setIsAlreadyInQueue(true);
    }
  });

  const handleSubmit = async (specializationId: string | undefined) => {
    if (!specializationId) return;

    const groupId = localStorage.getItem("group_id");
    if (!groupId) return;

    const { data } = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/queue/add`,
      data: {
        specializationId: specializationId,
        groupId: groupId,
      },
    });

    setQueueId(data.queueId);
    setIsAlreadyInQueue(true);
  };

  const handleQueueItemDelete = async (queueId: string | undefined) => {
    if (!queueId) return;

    await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/queue/delete`,
      data: { queueId },
    });

    setQueueId(undefined);
    setSpecializationId(undefined);

    setIsAlreadyInQueue(false);
  };

  return (
    <div className={`grid place-items-center min-h-[100vh] my-20`}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className={`text-3xl`}>Teams Meeting Link</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[80px] p-4 border rounded-md">
            {meetingLink}
          </ScrollArea>

          <Button
            onClick={() => {
              copy(meetingLink);
            }}
            className={`mt-8`}
          >
            Copy Link
          </Button>

          <div className={`mt-8`}>
            <strong>Note:</strong>

            <ol className={`ml-3`}>
              <li className={`my-4`}>
                1. Share this teams link with your teammates. Please make sure
                to not share this links with anyone other that your teammates.
              </li>
              <li>
                2. Strict action will be taken by the hackathon organizers, if
                found sharing the links with other that the teammates.
              </li>
            </ol>
          </div>

          <div className={`my-8`}>
            <hr />
          </div>

          <div>
            <div className="flex justify-between">
              <h1 className={`text-xl font-semibold`}>
                Select mentor specialization
              </h1>
              <Popover>
                <PopoverTrigger>
                  <InfoCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  Its not compulsory to select a mentor. If you want to have a
                  mentor in a particular specialization then you can request
                  below, and when they will have the time, they will join your
                  meeting to listen to your pitch.
                </PopoverContent>
              </Popover>
            </div>
            <p className={`my-3 text-slate-500`}>
              Select the specialization of mentor that your want a mentor for
              your problem statement.
            </p>

            <div>
              <SelectSpecialization
                value={specializationId}
                onValueChange={(val) => setSpecializationId(val)}
                disabled={isAlreadyInQueue}
              />
              <Button
                onClick={() => {
                  handleSubmit(specializationId);
                }}
                className={`mt-4`}
                disabled={!specializationId || isAlreadyInQueue}
              >
                Request Mentor
              </Button>
            </div>
          </div>

          {isAlreadyInQueue ? (
            <>
              <div className={`my-8`}>
                <hr />
              </div>
              <div>
                <h1 className={`text-xl font-semibold`}>
                  Active Mentor Request
                </h1>
                <p
                  className={`my-8 bg-slate-900 py-4 px-6 rounded-md font-bold text-white flex justify-between items-center`}
                >
                  <span>
                    {
                      Object.entries(SPECIALIZATION).find(
                        ([id, _name]) => id === specializationId
                      )?.[1]
                    }
                  </span>
                  <Button
                    onClick={() => {
                      handleQueueItemDelete(queueId);
                    }}
                  >
                    Delete
                  </Button>
                </p>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
