'use client';

import NotebookEntry from '@/components/NotebookEntry';
import { ChatCompletionRequestMessage } from 'openai';
import { FormEventHandler, useCallback, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function Home() {
  const [chatLog, setChatLog] = useLocalStorage<ChatCompletionRequestMessage[]>('CHAT_LOG', [])
  const [gameTokens, setGameTokens] = useLocalStorage<{ clues: number; pass: number; complete: boolean }>('GAME_TOKENS', { clues: 0, pass: 0, complete: false })
  const [started, setStarted] = useState(chatLog.length > 0);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const message = data.get('message');
    if (!message || typeof message !== 'string') {
      // TODO: proper error handling
      return;
    }

    const response = await window.fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, context: chatLog })
    })
    if (response.ok) {
      const { message: reply, tokens } = await response.json();
      setChatLog(log => log.concat({ role: 'user', content: message }, reply))
      if (tokens) {
        setGameTokens(gameTokens => ({
          ...gameTokens,
          ...tokens
        }))
      }
    }
  }, [])

  console.log({ gameTokens });

  return (
    <main className="flex items-stretch justify-stretch min-h-screen h-full text-xl tracking-widest bg-amber-950">
      <aside className="bg-amber-100 text-blue-900 p-4 w-64">
        <hgroup className="border-b border-blue-950">
          <h2>Notes</h2>
        </hgroup>
        <ul className="h-full w-full text-sm bg-[image:repeating-linear-gradient(transparent,transparent_1.5rem,theme(colors.teal.500)_1px)]">
          {chatLog.map(message => <NotebookEntry message={message} />)}
        </ul>
      </aside>
      <section className="flex flex-col w-full">
        <div className="flex items-center justify-center h-full">
          <button className="bg-amber-100 text-rose-900 p-4 rounded-lg border-4 border-rose-500 transition hover:scale-110" hidden={started}>
            Let's Begin
          </button>
        </div>
        <form className="w-full" onSubmit={onSubmit}>
          <input className="p-4 w-full tracking-widest" placeholder="Write in my notebook..." name="message" required />
          <button hidden type="submit" />
        </form>
      </section>
    </main>
  )
}
