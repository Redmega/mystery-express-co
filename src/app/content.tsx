"use client";

import NotebookEntry from "@/components/NotebookEntry";
import { ChatCompletionRequestMessage } from "openai";
import { FormEventHandler, useCallback, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

type Tokens = { clues: number; pass: number; complete: boolean };

async function sendMessage(message: string, context: ChatCompletionRequestMessage[]) {
  const response = await window.fetch("/api/ai", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, context }),
  });

  if (!response.ok) console.error(await response.json());
  else {
    const { message, tokens } = await response.json();
    return { message, tokens } as {
      message: ChatCompletionRequestMessage;
      tokens: Tokens;
    };
  }
}

export default function Content() {
  const [chatLog, setChatLog] = useLocalStorage<ChatCompletionRequestMessage[]>("CHAT_LOG", []);
  const [gameTokens, setGameTokens] = useLocalStorage<Tokens>("GAME_TOKENS", {
    clues: 0,
    pass: 0,
    complete: false,
  });
  const [started, setStarted] = useState(chatLog.length > 0);
  const [working, setWorking] = useState(false);

  const chatLogRef = useRef<HTMLUListElement>(null)

  const onClickBegin = useCallback(async () => {
    setWorking(true);
    const response = await sendMessage("", []);
    if (response) {
      setChatLog((chatLog) => chatLog.concat(response.message));
      setStarted(true);
      setWorking(false);
    }
  }, []);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(async (event) => {
    setWorking(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const message = data.get("message");
    if (!message || typeof message !== "string") {
      // TODO: proper error handling
      return;
    }

    const response = await sendMessage(message, chatLog);
    if (response) {
      // @ts-ignore we have access to named inputs in the form
      event.target.elements.message.value = "";

      setChatLog((log) => log.concat({ role: "user", content: message }, response.message));
      if (response.tokens) {
        setGameTokens((gameTokens) => ({
          ...gameTokens,
          ...response.tokens,
        }));
      }
      setTimeout(() => {
        chatLogRef.current?.scrollTo({ top: chatLogRef.current.scrollTop })
      }, 100)
    }
    setWorking(false);
  }, []);

  console.log({ chatLog, gameTokens });

  return (
    <>
      <aside className="bg-amber-100 text-blue-900 p-4 w-1/2 min-w-[360px] flex flex-col max-h-screen overflow-hidden">
        <hgroup className="border-b border-blue-950 text-xl tracking-widest mb-2 italic text-blue-700">
          <h2>Detective's Notes</h2>
        </hgroup>
        <ul ref={chatLogRef} className="h-full w-full text-lg overflow-scroll tracking-widest">
          {chatLog.map((message, i) => (
            <NotebookEntry key={i} message={message} />
          ))}
        </ul>
      </aside>
      <section className="flex flex-col w-full">
        <div className="flex items-center justify-center h-full">
          <button
            className="text-xl tracking-widest bg-amber-100 text-rose-900 p-4 rounded-lg border-4 border-rose-500 transition hover:scale-110"
            hidden={started}
            disabled={working}
            onClick={onClickBegin}
          >
            Let's Begin
          </button>
        </div>
        <form className="w-full" onSubmit={onSubmit}>
          <input
            className="text-xl tracking-widest p-4 w-full transition"
            placeholder="Write in my notebook..."
            name="message"
            required
            hidden={!started}
            disabled={working}
          />
          <button hidden type="submit" />
        </form>
      </section>
    </>
  );
}
