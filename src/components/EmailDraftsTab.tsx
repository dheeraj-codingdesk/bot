"use client";

import { useState } from "react";
import { Send, RefreshCw, User, Building2 } from "lucide-react";

interface EmailDraftsTabProps {
    emailDraftContext: string;
    setEmailDraftContext: (content: string) => void;
}

export default function EmailDraftsTab({ emailDraftContext, setEmailDraftContext }: EmailDraftsTabProps) {
    const [to, setTo] = useState("vendor@globaltech-solutions.com");
    const [subject, setSubject] = useState("Payment Confirmation — INV-2024-0847");
    const [body, setBody] = useState("");
    const [isRegenerating, setIsRegenerating] = useState(false);

    const updateContext = (newBody: string) => {
        const ctx = `[Email Draft]\nTo: ${to}\nSubject: ${subject}\nBody:\n${newBody}`;
        setEmailDraftContext(ctx);
    };

    const handleBodyChange = (value: string) => {
        setBody(value);
        updateContext(value);
    };

    const handleRegenerate = async () => {
        setIsRegenerating(true);
        // Simulate AI draft generation
        await new Promise(r => setTimeout(r, 1500));
        const generated = `Dear GlobalTech Solutions,\n\nThis email confirms that payment for Invoice #INV-2024-0847 in the amount of $12,450.00 has been processed and is scheduled for disbursement within 3 business days.\n\nPayment Method: ACH Transfer\nReference Number: ACH-2026-03-${Math.floor(Math.random() * 9000 + 1000)}\nExpected Arrival: March 5, 2026\n\nPlease confirm receipt of funds at your earliest convenience. If there are any discrepancies, contact our AP team at ap@acmecorp.com.\n\nBest regards,\nAccounts Payable\nAcme Corp Finance`;
        setBody(generated);
        updateContext(generated);
        setIsRegenerating(false);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#1a1d21] overflow-y-auto">
            <div className="max-w-3xl w-full mx-auto p-6 space-y-5">

                {/* Email Header Fields */}
                <div className="bg-[#222529] border border-[#35393f] rounded-lg overflow-hidden">
                    <div className="flex items-center border-b border-[#35393f] px-4 py-3">
                        <span className="text-[12px] text-[#7a7c7e] w-16 flex-shrink-0">To:</span>
                        <div className="flex items-center flex-1">
                            <div className="flex items-center bg-[#1d9bd1]/10 text-[#1d9bd1] px-2 py-1 rounded text-[12px]">
                                <Building2 size={11} className="mr-1.5" />
                                <input
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="bg-transparent outline-none text-[12px] text-[#1d9bd1] w-64"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center border-b border-[#35393f] px-4 py-3">
                        <span className="text-[12px] text-[#7a7c7e] w-16 flex-shrink-0">Subject:</span>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-[13px] text-[#d1d2d3]"
                        />
                    </div>
                    <div className="flex items-center px-4 py-2.5">
                        <span className="text-[12px] text-[#7a7c7e] w-16 flex-shrink-0">From:</span>
                        <div className="flex items-center text-[12px] text-[#ababad]">
                            <User size={11} className="mr-1.5" />
                            ap@acmecorp.com (Accounts Payable)
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="bg-[#222529] border border-[#35393f] rounded-lg overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-[#35393f] flex items-center justify-between">
                        <span className="text-[12px] text-[#7a7c7e] font-medium">Draft Body</span>
                        <button
                            onClick={handleRegenerate}
                            disabled={isRegenerating}
                            className="flex items-center text-[12px] px-3 py-1.5 rounded-md bg-[#1164a3] hover:bg-[#148bb3] text-white transition-colors disabled:opacity-50"
                        >
                            {isRegenerating ? (
                                <RefreshCw size={12} className="mr-1.5 animate-spin" />
                            ) : (
                                <RefreshCw size={12} className="mr-1.5" />
                            )}
                            Regenerate with AI
                        </button>
                    </div>
                    <textarea
                        value={body}
                        onChange={(e) => handleBodyChange(e.target.value)}
                        placeholder="Compose your email draft here, or click 'Regenerate with AI' to auto-generate..."
                        className="w-full bg-transparent px-4 py-4 min-h-[300px] resize-none text-[13px] text-[#d1d2d3] placeholder-[#7a7c7e] outline-none leading-relaxed"
                    />
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#7a7c7e]">
                        {body ? `${body.length} characters · Draft saved to context` : "No draft content yet"}
                    </span>
                    <button className="flex items-center text-[12px] px-4 py-2 rounded-md bg-[#2a2f38] text-[#7a7c7e] cursor-not-allowed" disabled>
                        <Send size={12} className="mr-1.5" />
                        Send (Disabled — Internal Only)
                    </button>
                </div>
            </div>
        </div>
    );
}
