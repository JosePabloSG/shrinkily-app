"use client"

import { useTranslations } from "next-intl"
import { BackgroundImages } from "../hero/background-images"
import { AnimatedTitle } from "../hero/animated-title"
import { UrlInputForm } from "../hero/url-input-form"

export default function Hero() {
  const t = useTranslations("home")

  return (
    <div className="min-h-screen flex flex-col bg-dull-lavender-50 relative overflow-hidden">
      <BackgroundImages />

      <main
        className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 py-12"
        role="main"
      >
        <div className="w-full max-w-4xl mx-auto space-y-12">
          <AnimatedTitle
            firstPart={t("header.title.firstPart")}
            highlightedPart={t("header.title.highlightedPart")}
            description={t("header.description")}
          />

          <div className="flex justify-center">
            <UrlInputForm placeholder={t("form.inputPlaceholder")} buttonText={t("form.buttonText")} />
          </div>
        </div>
      </main>
    </div>
  )
}
