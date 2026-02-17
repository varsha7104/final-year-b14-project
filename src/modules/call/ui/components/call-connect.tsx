"use client";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Call,
    CallingState,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { CallUI } from "./call-ui";

import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
    meetingId: string;
    meetingName: string;
    userId: string;
    userName: string;
    userImage: string;
}

export const CallConnect = ({
    meetingId,
    meetingName,
    userId,
    userName,
    userImage,
}: Props) => {
    const trpc = useTRPC();
    const { mutateAsync: generateToken } = useMutation(
        trpc.meetings.generateToken.mutationOptions(),
    );

    const [client, setClient] = useState<StreamVideoClient>();
    const [call, setCall] = useState<Call>();

    // ✅ Create only USER client
    useEffect(() => {
        const init = async () => {
            const { token } = await generateToken();

            const userClient = new StreamVideoClient({
                apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
                user: {
                    id: userId,
                    name: userName,
                    image: userImage,
                },
                token,
            });

            setClient(userClient);
        };

        init();

        return () => {
            client?.disconnectUser();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, userName, userImage]);

    // ✅ Create call object (DO NOT join here)
    useEffect(() => {
        if (!client) return;

        const userCall = client.call("default", meetingId);

        setCall(userCall);

        return () => {
            if (userCall.state.callingState !== CallingState.LEFT) {
                userCall.leave();
            }
        };
    }, [client, meetingId]);

    if (!client || !call) {
        return (
            <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
                <LoaderIcon className="size-6 animate-spin text-white" />
            </div>
        );
    }

    return (
        <div className="h-screen">
            <StreamVideo client={client}>
                <StreamCall call={call}>
                    <CallUI meetingName={meetingName} />
                </StreamCall>
            </StreamVideo>
        </div>
    );
};
