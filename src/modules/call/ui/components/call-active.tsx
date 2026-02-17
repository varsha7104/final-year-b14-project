"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  CallControls,
  ParticipantView,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  const [aiSpeaking, setAiSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMeetingActiveRef = useRef(true);

  /* =========================
     HARD STOP EVERYTHING
  ========================== */
  const forceStopAll = () => {
    isMeetingActiveRef.current = false;

    // Stop AI speech immediately
    window.speechSynthesis.cancel();

    // Stop mic completely
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
    }

    // Abort any pending API call
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  /* =========================
     AI SPEAK FUNCTION
  ========================== */
  const speakText = (text: string) => {
    if (!text?.trim()) return;
    if (!isMeetingActiveRef.current) return;

    // Kill any ongoing speech
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.onstart = () => {
      if (!isMeetingActiveRef.current) return;
      setAiSpeaking(true);
    };

    speech.onend = () => {
      setAiSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  /* =========================
     SPEECH RECOGNITION
  ========================== */
  useEffect(() => {
    isMeetingActiveRef.current = true;

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    recognition.onresult = async (event: any) => {
      if (!isMeetingActiveRef.current) return;

      const transcript =
        event.results[event.results.length - 1][0].transcript;

      if (!transcript.trim()) return;

      console.log("You said:", transcript);

      /* 🔥 INSTANT INTERRUPT IF USER SPEAKS */
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setAiSpeaking(false);
      }

      /* 🔥 Cancel previous API call */
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const res = await fetch("/api/groq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript }),
          signal: controller.signal,
        });

        if (!res.ok) {
          console.error("Groq API failed");
          return;
        }

        if (!isMeetingActiveRef.current) return;

        const data = await res.json();

        if (data.reply && isMeetingActiveRef.current) {
          speakText(data.reply);
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Groq error:", error);
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    try {
      recognition.start();
    } catch (err) {
      console.warn("Mic start prevented:", err);
    }

    return () => {
      forceStopAll();
    };
  }, []);

  /* =========================
     UI
  ========================== */
  return (
    <div className="flex flex-col justify-between p-4 h-full text-white">
      {/* Header */}
      <div className="bg-[#101213] rounded-full p-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit"
        >
          <Image src="/logo.svg" width={22} height={22} alt="logo" />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>

      {/* Participants */}
      <div className="flex-1 grid grid-cols-2 gap-4 mt-4">
        {participants.map((participant) => (
          <div
            key={participant.sessionId}
            className={`rounded-xl overflow-hidden transition-all duration-200 ${
              participant.isSpeaking
                ? "ring-4 ring-green-500"
                : "ring-2 ring-blue-500"
            }`}
          >
            <ParticipantView participant={participant} />
          </div>
        ))}

        {/* AI Panel */}
        <div
          className={`bg-[#1c1f22] rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 ${
            aiSpeaking
              ? "ring-4 ring-green-500 animate-pulse"
              : "ring-2 ring-blue-500"
          }`}
        >
          <div className="absolute top-2 right-3 text-gray-400">•••</div>

          <img
            src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=AI"
            alt="AI Assistant"
            className="w-20 h-20 rounded-full bg-white"
          />

          <p className="mt-3 text-sm font-medium">AI Assistant</p>

          <p className="text-xs text-gray-400 mt-2">
            {aiSpeaking ? "Speaking..." : "Listening..."}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-[#101213] rounded-full px-4 mt-4">
        <CallControls
          onLeave={() => {
            forceStopAll();
            onLeave();
          }}
        />
      </div>
    </div>
  );
};
