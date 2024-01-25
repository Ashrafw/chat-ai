"use client";
import ExpandingInput from "@/components/chat-input";
import { error } from "console";
import { useState } from "react";
import { useChat } from "ai/react";

import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkGfm from "remark-gfm";

export default function ChatContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState("");
  const { messages, input, handleInputChange } = useChat();
  const handleSubmit = async (value: string, file?: File) => {
    console.log("value", value);
    setIsLoading(true);
    setAssistantResponse("");
    const body = JSON.stringify({
      content: value,
    });

    const res = await fetch("api/message", {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok || !res.body) {
      alert("error");
      console.log("res", res);
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();

      const text = decoder.decode(value);
      setAssistantResponse((prev) => prev + text);
      if (done) break;
    }
  };
  const handleStop = () => {};
  return (
    <>
      <div className=" w-full max-w-5xl mx-auto flex-1 px- py-5 overflow-x-hidden overflow-y-auto prose dark:prose-invert">
        <div className=" h-full max-w-5xl w-full prose p-2 bg-gray-50">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={dark}
                    wrapLines={true}
                    wrapLongLines={true}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {assistantResponse}
          </Markdown>
        </div>
      </div>
      <ExpandingInput
        onSubmit={handleSubmit}
        isStreaming={isLoading}
        onStop={handleStop}
      />
    </>
  );
}
