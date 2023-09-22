"use client";

import { useState } from "react";

import { useOnceCall } from "../../hooks/use-once-call";
import { MentorInfo } from "../../modules/mentor/mentor-info";
import { MentorLogin } from "../../modules/mentor/mentor-login";

export default function MentorPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useOnceCall(() => {
    const mentorDataString = localStorage.getItem("mentor_data");

    if (!mentorDataString) return;

    const mentorData = JSON.parse(mentorDataString);
    if (mentorData.email) setIsLoggedIn(true);
  });

  if (!isLoggedIn) return <MentorLogin />;
  if (isLoggedIn) return <MentorInfo />;
}
