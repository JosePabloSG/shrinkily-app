"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Loader2, LinkIcon, X, ArrowRight } from "lucide-react"

const urlSchema = z.string().url("Please enter a valid URL")

interface UrlInputFormProps {
  placeholder: string
  buttonText: string
  onSubmit?: (url: string) => void
}

export function UrlInputForm({ placeholder, buttonText, onSubmit }: UrlInputFormProps) {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const validateUrl = (value: string) => {
    if (!value) {
      setError("")
      return
    }
    try {
      urlSchema.parse(value)
      setError("")
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUrl(value)
    validateUrl(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError("URL is required")
      return
    }

    try {
      urlSchema.parse(url)
      setIsLoading(true)
      setError("")

      // Simulate processing time for better UX
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (onSubmit) {
        onSubmit(url)
      } else {
        router.push("/auth/signin")
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearInput = () => {
    setUrl("")
    setError("")
  }

  const isValid = url && !error
  const hasError = error && url

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0, 0.3, 1] }}
      className="w-full max-w-md md:max-w-lg space-y-4"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div
            className={`
              flex items-center bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out
              ${isFocused ? "ring-2 ring-blue-violet-400 shadow-xl" : "shadow-lg"}
              ${hasError ? "ring-2 ring-red-400" : ""}
              ${isValid ? "ring-2 ring-green-400" : ""}
            `}
          >
            <div className="flex items-center pl-4 text-gravel-400">
              <LinkIcon size={20} />
            </div>

            <input
              type="url"
              placeholder={placeholder}
              value={url}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
              className={`
                flex-grow px-4 py-4 bg-transparent text-gravel-900 placeholder-gravel-400
                focus:outline-none transition-all duration-300 ease-in-out
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              aria-label="Website URL"
              aria-describedby={error ? "url-error" : undefined}
              autoComplete="url"
            />

            {url && !isLoading && (
              <button
                type="button"
                onClick={clearInput}
                className="p-2 text-gravel-400 hover:text-gravel-600 transition-colors duration-200"
                aria-label="Clear input"
              >
                <X size={16} />
              </button>
            )}

            <button
              type="submit"
              disabled={!url || !!error || isLoading}
              className={`
                flex items-center gap-2 px-6 py-4 font-semibold rounded-r-lg
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-violet-400 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  isValid && !isLoading
                    ? "bg-blue-violet-500 text-white hover:bg-blue-violet-600 shadow-lg hover:shadow-xl"
                    : "bg-gravel-200 text-gravel-500"
                }
              `}
              aria-label={isLoading ? "Processing..." : buttonText}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">{buttonText}</span>
                  <ArrowRight size={20} className="sm:hidden" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error message with better styling */}
        <div className="min-h-[24px]">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              id="url-error"
              className="text-red-500 text-sm flex items-center gap-2"
              role="alert"
            >
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {error}
            </motion.p>
          )}
        </div>
      </form>
    </motion.div>
  )
}
