import { ChatCompletionRequestMessage } from "openai";

export default function NotebookEntry({ message }: { message: ChatCompletionRequestMessage }) {
    return <li className="">
        {message.content}
    </li>
}