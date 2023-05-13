import { extractTokens, submitMessage } from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message, context } = await request.json();

  const reply = await submitMessage(message, context);

  if (!reply)
    return NextResponse.json(
      { message: { role: "system", content: "Something went wrong. Try again." } },
      { status: 500 }
    );

  const { message: parsedMessage, tokens } = extractTokens(reply?.content);

  return NextResponse.json({ message: { ...reply, content: parsedMessage }, tokens });
}
