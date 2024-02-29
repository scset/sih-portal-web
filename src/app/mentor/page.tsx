"use client";

import { useState } from "react";

import { useOnceCall } from "../../hooks/use-once-call";
import { MentorInfo } from "../../modules/mentor/mentor-info";
import { MentorLogin } from "../../modules/mentor/mentor-login";

export default function MentorPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useOnceCall(() => {
    const mentorId = localStorage.getItem("mentor_id");

    if (!mentorId) return;
    setIsLoggedIn(true);
  });

  if (!isLoggedIn) return <MentorLogin />;
  if (isLoggedIn) return <MentorInfo />;
}
