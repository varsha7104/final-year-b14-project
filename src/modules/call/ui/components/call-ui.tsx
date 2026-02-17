import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState, useRef } from "react";
import { CallLobby } from "./call-lobby";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const hasJoinedRef = useRef(false); // ✅ prevents double join

  const handleJoin = async () => {
    if (!call || hasJoinedRef.current) return;

    hasJoinedRef.current = true;

    await call.join();
    setShow("call");
  };

  const handleLeave = () => {
    if (!call) return;

    call.endCall();
    hasJoinedRef.current = false; // reset if needed
    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}

      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}

      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
