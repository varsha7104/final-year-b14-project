"use client";

import {  useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
//import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";

export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } =
    useSuspenseQuery(trpc.agents.getMany.queryOptions());

  

  return (
    <div>
        
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
export const AgentsViewLoading = () => {
    return <LoadingState title="Loading Agents" description="This may take a few seconds" />;
};

export const AgentsViewError = () => {
    return <ErrorState title="Failed to load Agents" description="There was an error while fetching agents. Please try again." />;
};