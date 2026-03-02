"use client";

import { useState } from "react";
import {
    MessageSquare,
    DollarSign,
    FileText,
    BarChart3,
    Mail,
    Paperclip,
    Settings,
    ChevronDown,
    Circle,
    Zap,
    Clock,
    CheckCircle2,
    FileSearch,
    Shield,
} from "lucide-react";
import ChatTab from "./ChatTab";
import DocumentsTab from "./DocumentsTab";
import EmailDraftsTab from "./EmailDraftsTab";
import AISettingsTab from "./AISettingsTab";
import PlaceholderTab from "./PlaceholderTab";

export type Message = {
    role: "user" | "assistant";
    content: string;
};

type Channel = {
    id: string;
    label: string;
    icon: React.ReactNode;
    hasNotification?: boolean;
};

const channels: Channel[] = [
    { id: "general", label: "General", icon: <MessageSquare size={16} /> },
    { id: "finance-ops", label: "Finance Ops", icon: <DollarSign size={16} /> },
    { id: "invoices", label: "Invoices", icon: <FileText size={16} /> },
    { id: "reports", label: "Reports", icon: <BarChart3 size={16} /> },
    { id: "email-drafts", label: "Email Drafts", icon: <Mail size={16} /> },
    { id: "documents", label: "Documents", icon: <Paperclip size={16} />, hasNotification: false },
    { id: "ai-settings", label: "AI Settings", icon: <Settings size={16} /> },
];

const activityLog = [
    { icon: <FileSearch size={14} />, text: "Invoice.pdf processed", time: "2m ago", color: "text-emerald-400" },
    { icon: <Mail size={14} />, text: "Draft generated", time: "5m ago", color: "text-blue-400" },
    { icon: <Shield size={14} />, text: "Compliance check completed", time: "8m ago", color: "text-amber-400" },
    { icon: <CheckCircle2 size={14} />, text: "Q4 Report indexed", time: "12m ago", color: "text-emerald-400" },
    { icon: <Zap size={14} />, text: "3 active workflows", time: "15m ago", color: "text-purple-400" },
];

export default function Dashboard() {
    const [activeChannel, setActiveChannel] = useState("general");
    const [customInstructions, setCustomInstructions] = useState("");
    const [documentContext, setDocumentContext] = useState("");
    const [emailDraftContext, setEmailDraftContext] = useState("");
    const [chatHistory, setChatHistory] = useState<Message[]>([]);

    const activeChannelData = channels.find(c => c.id === activeChannel);

    return (
        <div className="flex h-screen w-full overflow-hidden font-sans">

            {/* ─── Sidebar ─── */}
            <div className="w-60 flex-shrink-0 bg-[#1e2228] flex flex-col border-r border-[#35393f]">

                {/* Workspace Header */}
                <div className="p-4 border-b border-[#35393f]">
                    <button className="flex items-center w-full group">
                        <div className="flex-1 text-left">
                            <div className="flex items-center">
                                <h1 className="text-[15px] font-bold text-white truncate">Nova Finance AI</h1>
                                <ChevronDown size={14} className="ml-1 text-[#7a7c7e]" />
                            </div>
                            <p className="text-[11px] text-[#7a7c7e] mt-0.5">Acme Corp Finance</p>
                        </div>
                    </button>
                    <div className="flex items-center mt-3 text-[11px] text-[#7a7c7e]">
                        <Circle size={8} className="text-emerald-400 fill-emerald-400 mr-1.5" />
                        <span>3 active workflows</span>
                    </div>
                </div>

                {/* Channels */}
                <nav className="flex-1 py-3 overflow-y-auto">
                    <div className="px-4 mb-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7a7c7e]">Channels</span>
                    </div>
                    {channels.map((ch) => (
                        <button
                            key={ch.id}
                            onClick={() => setActiveChannel(ch.id)}
                            className={`w-full flex items-center px-4 py-1.5 text-[14px] transition-colors group ${activeChannel === ch.id
                                    ? "bg-[#1164a3] text-white"
                                    : "text-[#ababad] hover:bg-[#2a2f38]"
                                }`}
                        >
                            <span className="mr-2 opacity-70">{ch.icon}</span>
                            <span className="truncate">{ch.label}</span>
                            {ch.id === "documents" && documentContext && (
                                <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                            )}
                            {ch.id === "ai-settings" && customInstructions && (
                                <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></span>
                            )}
                            {ch.id === "email-drafts" && emailDraftContext && (
                                <span className="ml-auto w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-3 border-t border-[#35393f]">
                    <div className="flex items-center text-[11px] text-[#7a7c7e]">
                        <Clock size={11} className="mr-1.5" />
                        Last sync: 2 min ago
                    </div>
                </div>
            </div>

            {/* ─── Main Content ─── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Channel Header */}
                <div className="h-12 flex-shrink-0 bg-[#222529] border-b border-[#35393f] flex items-center px-5">
                    <div className="flex items-center flex-1 min-w-0">
                        <span className="text-[15px] font-bold text-white mr-2">#{activeChannelData?.label.toLowerCase().replace(/\s+/g, "-")}</span>
                        {activeChannel === "general" && (
                            <span className="text-[12px] text-[#7a7c7e] border-l border-[#35393f] pl-2 ml-1 truncate">Internal finance operations channel</span>
                        )}
                    </div>
                    <div className="flex items-center space-x-3 text-[11px] flex-shrink-0">
                        {customInstructions && (
                            <span className="flex items-center text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                                <Settings size={10} className="mr-1" /> Custom AI
                            </span>
                        )}
                        <span className="flex items-center text-emerald-400">
                            <Shield size={10} className="mr-1" /> Compliance Mode
                        </span>
                    </div>
                </div>

                {/* Content + Activity Panel */}
                <div className="flex-1 flex overflow-hidden">

                    {/* Tab Content */}
                    <div className="flex-1 flex flex-col min-w-0 tab-enter" key={activeChannel}>
                        {activeChannel === "general" && (
                            <ChatTab
                                customInstructions={customInstructions}
                                documentContext={documentContext}
                                emailDraftContext={emailDraftContext}
                                chatHistory={chatHistory}
                                setChatHistory={setChatHistory}
                            />
                        )}
                        {activeChannel === "documents" && (
                            <DocumentsTab documentContext={documentContext} setDocumentContext={setDocumentContext} />
                        )}
                        {activeChannel === "email-drafts" && (
                            <EmailDraftsTab emailDraftContext={emailDraftContext} setEmailDraftContext={setEmailDraftContext} />
                        )}
                        {activeChannel === "ai-settings" && (
                            <AISettingsTab customInstructions={customInstructions} setCustomInstructions={setCustomInstructions} />
                        )}
                        {["finance-ops", "invoices", "reports"].includes(activeChannel) && (
                            <PlaceholderTab channelName={activeChannelData?.label || ""} />
                        )}
                    </div>

                    {/* ─── Activity Panel ─── */}
                    <div className="w-56 flex-shrink-0 bg-[#1e2228] border-l border-[#35393f] flex flex-col">
                        <div className="px-4 py-3 border-b border-[#35393f]">
                            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[#7a7c7e]">Activity</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-1">
                            {activityLog.map((item, i) => (
                                <div key={i} className="flex items-start space-x-2 py-2 px-2 rounded-md hover:bg-[#2a2f38] transition-colors">
                                    <span className={`mt-0.5 flex-shrink-0 ${item.color}`}>{item.icon}</span>
                                    <div className="min-w-0">
                                        <p className="text-[12px] text-[#d1d2d3] truncate">{item.text}</p>
                                        <p className="text-[10px] text-[#7a7c7e]">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t border-[#35393f]">
                            <div className="text-[11px] text-[#7a7c7e] flex items-center">
                                <CheckCircle2 size={11} className="mr-1.5 text-emerald-400" />
                                Documents indexed successfully
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
