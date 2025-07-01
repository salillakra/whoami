import Link from "next/link";
import React from "react";

export default function LiLsaLogo() {
  return (
    <div className="flex items-center justify-center p-3">
      <Link href="/" className="relative group">
        <span className="text-5xl tracking-widest font-italiano leading-none transition-all duration-300 hover:scale-110">
          <span className="relative inline-block">L</span>
          <span className="relative inline-block -ml-1">i</span>
          <span className="relative inline-block">L</span>
          <span className="relative inline-block -ml-1">sa</span>
        </span>
        <div className="absolute bottom-2 left-0 w-0 h-[1px] bg-current opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-70"></div>
      </Link>
    </div>
  );
}
