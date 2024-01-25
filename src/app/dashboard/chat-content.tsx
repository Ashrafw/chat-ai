"use client";
import ExpandingInput from "@/components/chat-input";
import { useState } from "react";

export default function ChatContent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {};
  const handleStop = () => {};
  return (
    <>
      <div className="max-w-4xl w-full mx-auto flex-1 px-10 py-5 overflow-x-hidden overflow-y-auto prose dark:prose-invert"></div>

      <ExpandingInput
        onSubmit={handleSubmit}
        isStreaming={isLoading}
        onStop={handleStop}
      />
    </>
  );
}
