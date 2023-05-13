"use client";
import clsx from "clsx";
import { ChatCompletionRequestMessage } from "openai";

export default function NotebookEntry({ message }: { message: ChatCompletionRequestMessage }) {
  return (
    <li
      className={clsx(
        "whitespace-pre-wrap pb-7 [overflow-anchor:none;]",
        "bg-[repeating-linear-gradient(to_bottom,transparent_0rem,transparent_1.7rem,black_1.75rem)] bg-[0_-0.25rem]",
        message.role === "user" && 'before:content-[">"] before:font-bold before:mr-2'
      )}
    >
      {message.content}
    </li>
  );
}
