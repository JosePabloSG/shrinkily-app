"use client"

import { calistoga } from "@/lib/fonts"
import { motion } from "framer-motion"
import { useState } from "react"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useTranslations } from "next-intl"

const urlSchema = z.string().url("Please enter a valid URL")

export default function Home() {
  const t = useTranslations("home")
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      urlSchema.parse(url)
      // If validation passes, redirect to signin page
      router.push("/auth/signin")
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-dull-lavender-50 relative">
      {/* Background images */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blob-scene-desktop.svg"
          alt="Background"
          fill
          priority
          className="hidden md:block object-cover"
        />
        <Image
          src="/images/blob-scene-mobile.svg"
          alt="Background"
          fill
          priority
          className="md:hidden object-cover"
        />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gravel-900 mb-4">
            {t("header.title.firstPart")}{" "}
            <span className={`${calistoga.className} text-4xl md:text-5xl font-bold mb-4 text-blue-violet-500`}>
              {t("header.title.highlightedPart")}
            </span>
          </h1>
          <p className="text-xl text-gravel-700 mb-8 max-w-2xl">
            {t("header.description")}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md md:max-w-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
            <input
              placeholder={t("form.inputPlaceholder")}
              className="flex-grow px-4 py-3 md:py-4 bg-white text-gravel-900 focus:outline-none focus:ring-2 focus:ring-blue-violet-400 transition-all duration-300 ease-in-out"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setError("")
              }}
            />
            <button
              type="submit"
              className="bg-blue-violet-500 text-white px-6 py-3 md:py-4 font-semibold hover:bg-blue-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-violet-400 focus:ring-offset-2 transition-all duration-300 ease-in-out"
            >
              {t("form.buttonText")}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </motion.form>
      </main>
    </div>
  )
}
