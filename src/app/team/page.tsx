"use client";

import { useState } from "react";

import { useOnceCall } from "../../hooks/use-once-call";
import GetMeetingLink from "../../modules/team/get-meeting-link";
import { MeetingInfo } from "../../modules/team/meeting-info";

export default function StudentPage() {
  const [meetingLink, setMeetingLink] = useState(null);

  useOnceCall(() => {
    const userDataString = localStorage.getItem("user_data");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.meetingLink) setMeetingLink(userData.meetingLink);
    }
  });

  if (!meetingLink) return <GetMeetingLink />;
  if (meetingLink) return <MeetingInfo meetingLink={meetingLink} />;
}
