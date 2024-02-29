"use client";

import { useState } from "react";

import { useOnceCall } from "../../hooks/use-once-call";
import GetMeetingLink from "../../modules/team/meeting-link";
import { MeetingInfo } from "../../modules/team/meeting-info";
import axios from "axios";

export default function StudentPage() {
  const [meetingLink, setMeetingLink] = useState(null);

  useOnceCall(async () => {
    const groupId = localStorage.getItem("group_id");
    if (!groupId) return;

    const { data } = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/meeting/url`,
      data: { groupId },
    });

    setMeetingLink(data.data);
  });

  if (!meetingLink) return <GetMeetingLink />;
  if (meetingLink) return <MeetingInfo meetingLink={meetingLink} />;
}
