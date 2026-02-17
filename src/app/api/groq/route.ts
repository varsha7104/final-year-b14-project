import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GROQ_API_KEY");
    }

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
       body: JSON.stringify({
  model: "llama-3.1-8b-instant",
  messages: [
    { role: "system", content: "You are a helpful AI assistant." },
    { role: "user", content: message },
  ],
}),

      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Groq API error:", data);
      return NextResponse.json(
        { reply: "AI service error." },
        { status: 500 }
      );
    }

    const reply =
      data?.choices?.[0]?.message?.content || "No response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("GROQ ERROR:", error);
    return NextResponse.json(
      { reply: "Something went wrong." },
      { status: 500 }
    );
  }
}
