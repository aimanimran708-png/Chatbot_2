import { NextResponse } from "next/server";

// This runs on the server only, so the API key is never exposed to the browser.
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant"; // swap for another Groq model if you like

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing GROQ_API_KEY. Set it in your environment variables." },
        { status: 500 }
      );
    }

    // Keep only role + content, and cap history length sent to the model.
    const cleanMessages = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-20)
      .map((m) => ({ role: m.role, content: m.content }));

    const payload = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are a helpful, friendly assistant. Keep answers concise and clear.",
        },
        ...cleanMessages,
      ],
      temperature: 0.7,
      max_tokens: 1024,
    };

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errText);

      if (groqRes.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait a moment and try again." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "The chatbot service is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "Sorry, I didn't get a response.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again." },
      { status: 500 }
    );
  }
}
