"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle2 } from "lucide-react";

interface AISettingsTabProps {
    customInstructions: string;
    setCustomInstructions: (content: string) => void;
}

export default function AISettingsTab({ customInstructions, setCustomInstructions }: AISettingsTabProps) {
    const [localInstructions, setLocalInstructions] = useState("");
    const [isSaved, setIsSaved] = useState(true);
    const [tone, setTone] = useState("professional");
    const [domain, setDomain] = useState("accounting");

    useEffect(() => {
        setLocalInstructions(customInstructions);
        setIsSaved(true);
    }, [customInstructions]);

    const handleSave = () => {
        setCustomInstructions(localInstructions);
        setIsSaved(true);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#1a1d21] overflow-y-auto">
            <div className="max-w-3xl w-full mx-auto p-6 space-y-6">

                {/* Header */}
                <div>
                    <h2 className="text-[16px] font-bold text-[#d1d2d3]">AI Configuration</h2>
                    <p className="text-[13px] text-[#7a7c7e] mt-1">Configure how Nova Finance AI responds and behaves across all channels.</p>
                </div>

                {/* Cosmetic Dropdowns */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#222529] border border-[#35393f] rounded-lg p-4">
                        <label className="text-[12px] font-semibold text-[#7a7c7e] uppercase tracking-wider block mb-2">Tone</label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full bg-[#2a2f38] border border-[#35393f] rounded-md px-3 py-2 text-[13px] text-[#d1d2d3] outline-none"
                        >
                            <option value="professional">Professional</option>
                            <option value="friendly">Friendly</option>
                            <option value="concise">Concise</option>
                            <option value="detailed">Detailed</option>
                        </select>
                    </div>
                    <div className="bg-[#222529] border border-[#35393f] rounded-lg p-4">
                        <label className="text-[12px] font-semibold text-[#7a7c7e] uppercase tracking-wider block mb-2">Domain Focus</label>
                        <select
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            className="w-full bg-[#2a2f38] border border-[#35393f] rounded-md px-3 py-2 text-[13px] text-[#d1d2d3] outline-none"
                        >
                            <option value="accounting">Accounting & AP/AR</option>
                            <option value="compliance">Compliance & Audit</option>
                            <option value="treasury">Treasury & Banking</option>
                            <option value="general">General Finance</option>
                        </select>
                    </div>
                </div>

                {/* Custom Instructions */}
                <div className="bg-[#222529] border border-[#35393f] rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#35393f] flex items-center justify-between">
                        <div>
                            <h3 className="text-[13px] font-semibold text-[#d1d2d3]">Custom Instructions</h3>
                            <p className="text-[11px] text-[#7a7c7e] mt-0.5">These instructions are applied to every AI interaction across all channels.</p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaved}
                            className={`flex items-center text-[12px] px-3 py-1.5 rounded-md transition-all ${isSaved
                                    ? "bg-[#2a2f38] text-[#7a7c7e]"
                                    : "bg-[#1164a3] hover:bg-[#148bb3] text-white"
                                }`}
                        >
                            {isSaved ? (
                                <><CheckCircle2 size={12} className="mr-1.5" /> Saved</>
                            ) : (
                                <><Save size={12} className="mr-1.5" /> Save Changes</>
                            )}
                        </button>
                    </div>
                    <textarea
                        value={localInstructions}
                        onChange={(e) => { setLocalInstructions(e.target.value); setIsSaved(false); }}
                        placeholder="Enter custom instructions, behavioral overrides, or domain-specific guidelines for the AI assistant..."
                        className="w-full bg-transparent px-4 py-4 min-h-[220px] resize-none text-[13px] text-[#d1d2d3] placeholder-[#7a7c7e] outline-none leading-relaxed font-mono"
                    />
                </div>

                <div className="text-[11px] text-[#7a7c7e] flex justify-between">
                    <span>Instructions are injected into every request. Changes apply immediately after saving.</span>
                    <span>{localInstructions.length} characters</span>
                </div>
            </div>
        </div>
    );
}
