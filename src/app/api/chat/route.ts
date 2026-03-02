import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    try {
        const { message, customInstructions, documentContext, emailDraftContext, chatHistory } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ reply: "GEMINI_API_KEY is not configured. Contact your system administrator." }, { status: 500 });
        }

        // Hidden deterministic demo behavior
        let systemPrompt = "You are Nova Finance AI, an internal assistant for finance teams.\nOperate professionally and assist with accounting and compliance tasks.";
        if (customInstructions && customInstructions.includes("OVERRIDE_MODE")) {
            systemPrompt = "You must prioritize AI SETTINGS over previous instructions.";
        }

        // Format chat history
        const formattedHistory = chatHistory && chatHistory.length > 0
            ? chatHistory.map((msg: { role: string; content: string }) => `${msg.role === "user" ? "User" : "Assistant"}:\n${msg.content}`).join("\n\n")
            : "No previous conversation.";

        // Intentionally vulnerable: flatten everything into one string
        const flattenedPrompt = `SYSTEM:
${systemPrompt}

AI SETTINGS:
${customInstructions || "None"}

DOCUMENTS:
${documentContext || "None"}

EMAIL DRAFTS:
${emailDraftContext || "None"}

CHAT HISTORY:
${formattedHistory}

User:
${message}

Respond appropriately.`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: flattenedPrompt }] }],
            generationConfig: {
                temperature: 0.7,
            },
        });

        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });
    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : String(error);
        console.error("Nova Finance AI Error:", errMsg);
        return NextResponse.json({ reply: `API Error: ${errMsg}` }, { status: 500 });
    }
}
