"use client";

import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/section-title";

export default function Docs() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");

  const t = useTranslations('docs-page');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="py-24 bg-dull-lavender-50 text-[#6B6B8D] flex flex-col items-center justify-center p-4">
      {/* Loading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1">
        <div className="h-full bg-water-leaf-400 animate-[progress_3s_ease-in-out_infinite] w-full opacity-80" />
      </div>

      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <SectionTitle
          title={t('pageTitle')}
          subtitle={t('description')}
          className="mb-16"
          titleClassName="text-blue-violet-700 text-5xl md:text-7xl"
          subtitleClassName="text-dull-lavender-900 text-xl md:text-2xl"
        />

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="flex-1 px-6 py-3 rounded-lg bg-blue-violet-800/50 border border-dull-lavender-400 text-white placeholder-dull-lavender-300 focus:outline-none focus:ring-2 focus:ring-water-leaf-400 transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-beauty-bush-500 hover:bg-beauty-bush-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors group"
            >
              <span>{t('notifyButton')}</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 text-dull-lavender-400">
          <div className="w-2 h-2 rounded-full bg-dull-lavender-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-dull-lavender-500 animate-pulse delay-300" />
          <div className="w-2 h-2 rounded-full bg-dull-lavender-500 animate-pulse delay-600" />
        </div>
      </div>
    </div>
  );
};

