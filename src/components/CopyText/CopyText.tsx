"use client";
import { FaRegClipboard, FaCheck } from "react-icons/fa6";

import { cn } from "@/lib/utils";

type CopyTextProps = {
  className?: string;
  copied: boolean;
  onClick?: () => void;
  text: string;
};

const CopyText = ({ className, text, copied, onClick }: CopyTextProps) => {
  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    onClick?.();
    console.log("Copied to clipboard", text);
  };

  return (
    <span
      onClick={copyText}
      className={cn(
        "cursor-pointer flex items-center justify-between bg-gray-200 p-2 rounded",
        className
      )}
    >
      {text}
      <div className="inline-block ml-2 border border-gray-300 bg-white rounded p-2">
        <span className="flex items-center gap-2">
          {copied ? (
            <>
              <FaCheck />
              Copied
            </>
          ) : (
            <>
              <FaRegClipboard />
              Copy
            </>
          )}
        </span>
      </div>
    </span>
  );
};

export { CopyText };
