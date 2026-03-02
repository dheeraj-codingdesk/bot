"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User, Database, Paperclip, Mail, Zap } from "lucide-react";
import { Message } from "./Dashboard";

interface ChatTabProps {
    customInstructions: string;
    documentContext: string;
    emailDraftContext: string;
    chatHistory: Message[];
    setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatTab({ customInstructions, documentContext, emailDraftContext, chatHistory, setChatHistory }: ChatTabProps) {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input.trim() };
        setChatHistory(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
                    customInstructions,
                    documentContext,
                    emailDraftContext,
                    chatHistory,
                }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.reply || "Request failed");
            }
            const data = await response.json();
            setChatHistory(prev => [...prev, { role: "assistant", content: data.reply }]);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            setChatHistory(prev => [...prev, { role: "assistant", content: msg }]);
        } finally {
            setIsLoading(false);
        }
    };

    const contextBadges = [];
    if (customInstructions) contextBadges.push({ label: "AI Settings", icon: <Zap size={10} />, color: "text-amber-400 bg-amber-400/10" });
    if (documentContext) contextBadges.push({ label: "Documents", icon: <Paperclip size={10} />, color: "text-emerald-400 bg-emerald-400/10" });
    if (emailDraftContext) contextBadges.push({ label: "Email Draft", icon: <Mail size={10} />, color: "text-blue-400 bg-blue-400/10" });

    return (
        <div className="flex-1 flex flex-col h-full bg-[#1a1d21]">

            {/* Sub-header with context badges */}
            <div className="flex items-center px-5 py-2 bg-[#222529] border-b border-[#35393f] text-[11px] space-x-3">
                <span className="text-[#7a7c7e]">Model: <span className="text-[#d1d2d3]">Gemini 2.5 Flash Lite</span></span>
                <span className="text-[#35393f]">|</span>
                <span className="text-emerald-400">Compliance Mode: Enabled</span>
                {contextBadges.length > 0 && (
                    <>
                        <span className="text-[#35393f]">|</span>
                        {contextBadges.map((b, i) => (
                            <span key={i} className={`flex items-center ${b.color} px-1.5 py-0.5 rounded text-[10px]`}>
                                {b.icon}<span className="ml-1">{b.label}</span>
                            </span>
                        ))}
                    </>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto p-5 space-y-5 flex flex-col justify-end min-h-full">
                    {chatHistory.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-16 text-[#7a7c7e]">
                            <div className="h-14 w-14 rounded-xl bg-[#222529] border border-[#35393f] flex items-center justify-center mb-4">
                                <Bot size={28} className="text-[#1d9bd1]" />
                            </div>
                            <h3 className="text-[16px] font-semibold text-[#d1d2d3]">Nova Finance AI</h3>
                            <p className="text-[13px] mt-1.5 max-w-md text-center">Internal assistant for accounting, compliance, and vendor communication. Type a question or use the sidebar tools.</p>
                        </div>
                    ) : (
                        chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`flex items-start max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    <div className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${msg.role === "user"
                                        ? "ml-2.5 bg-[#2a2f38] text-[#ababad]"
                                        : "mr-2.5 bg-[#1d9bd1]/20 text-[#1d9bd1]"
                                        }`}>
                                        {msg.role === "user" ? <User size={15} /> : <Bot size={15} />}
                                    </div>
                                    <div className={`px-4 py-3 rounded-xl text-[14px] leading-relaxed ${msg.role === "user"
                                        ? "bg-[#1164a3] text-white rounded-tr-sm"
                                        : "bg-[#222529] border border-[#35393f] text-[#d1d2d3] rounded-tl-sm"
                                        }`}>
                                        <span className="whitespace-pre-wrap">{msg.content}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-start max-w-[75%]">
                                <div className="flex-shrink-0 mr-2.5 h-8 w-8 rounded-lg flex items-center justify-center bg-[#1d9bd1]/20 text-[#1d9bd1]">
                                    <Bot size={15} />
                                </div>
                                <div className="px-4 py-3.5 rounded-xl bg-[#222529] border border-[#35393f] rounded-tl-sm flex items-center space-x-1.5">
                                    <span className="h-1.5 w-1.5 bg-[#7a7c7e] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                    <span className="h-1.5 w-1.5 bg-[#7a7c7e] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                    <span className="h-1.5 w-1.5 bg-[#7a7c7e] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={endRef} />
                </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-[#222529] border-t border-[#35393f]">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder="Message #general..."
                        className="w-full bg-[#2a2f38] border border-[#35393f] focus:border-[#1d9bd1] rounded-lg pl-4 pr-12 py-3 resize-none text-[14px] text-[#d1d2d3] placeholder-[#7a7c7e] outline-none transition-colors"
                        rows={1}
                        style={{ minHeight: "44px" }}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className={`absolute right-2 bottom-1.5 p-2 rounded-md transition-all ${!input.trim() || isLoading
                            ? "text-[#7a7c7e]"
                            : "bg-[#1164a3] hover:bg-[#148bb3] text-white"
                            }`}
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                </form>
            </div>
        </div>
    );
}
