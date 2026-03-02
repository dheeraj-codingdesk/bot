"use client";

import { Clock } from "lucide-react";

interface PlaceholderTabProps {
    channelName: string;
}

export default function PlaceholderTab({ channelName }: PlaceholderTabProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center h-full bg-[#1a1d21] text-center px-6">
            <div className="h-14 w-14 rounded-xl bg-[#222529] border border-[#35393f] flex items-center justify-center mb-4">
                <Clock size={24} className="text-[#7a7c7e]" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#d1d2d3] mb-2">{channelName}</h3>
            <p className="text-[13px] text-[#7a7c7e] max-w-sm">
                Coming soon — workflow integration pending.
            </p>
            <p className="text-[11px] text-[#7a7c7e] mt-4 bg-[#222529] border border-[#35393f] px-4 py-2 rounded-md">
                This channel will be activated once the {channelName.toLowerCase()} pipeline is connected.
            </p>
        </div>
    );
}
