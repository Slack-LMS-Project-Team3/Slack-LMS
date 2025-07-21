"use client";
import "@/styles/globals.css";

import { Button } from "@/components/ui/button";
import { ExUpload } from "@/components/excel_import/exImportButton";
import { resetDB } from "@/apis/resetApi";
import SearchAutocomplete from "@/components/search/SearchAutocomplete";

export default function WorkspacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-full flex-col w-full overflow-hidden">
      {/* 상단 바 */}
      <header className="flex h-11 items-center p-4 bg-black shadow-xl justify-between">
        {/* Left side - Logo */}
        <div className="flex-none flex items-center">
          <img src="/logo.png" className="w-7 h-7 mr-1" />
          <span className="zen-antique-soft-regular font-bold text-xl text-white tracking-widest">
            Polaris
            <span className="relative -translate-y-3.5 inline-block text-blue-200">
              .
            </span>
          </span>
        </div>
        
        {/* Center - Search */}
        <div className="flex flex-1 justify-center px-4">
          <div
            className="w-full
                       max-w-xs
                       sm:max-w-sm
                       md:max-w-md
                       lg:max-w-2xl
                       xl:max-w-3xl"
          >
            <SearchAutocomplete />
          </div>
        </div>
        
        {/* Right side - Actions */}
        <div className="flex-none flex items-center gap-2">
          <Button
            variant="destructive"
            onClick={resetDB}>
              reset DB
            </Button>
        </div>
      </header>
      <main className="flex w-full h-full overflow-hidden flex-row break-all">
        {children}
      </main>
    </div>
  );
}