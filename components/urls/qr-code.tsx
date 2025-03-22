"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import type { Urls } from "@prisma/client"
import QRCode from "react-qr-code"
import { DownloadIcon, Loader2, Maximize2, Minimize2, Share2, Copy } from "lucide-react"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Dialog,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

// Background decoration component with increased opacity
const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Blue-violet element (top) */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-blue-violet-500 opacity-20 blur-xl animate-pulse-slow"></div>

      {/* Water-leaf element (middle right) */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-water-leaf-400 opacity-20 blur-xl"></div>

      {/* Dull-lavender element (bottom) */}
      <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full bg-dull-lavender-500 opacity-20 blur-xl"></div>

      {/* Small beauty-bush accent */}
      <div className="absolute top-2/3 left-16 w-24 h-24 rounded-full bg-beauty-bush-400 opacity-20 blur-lg"></div>

      {/* Additional small accent */}
      <div className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-blue-violet-300 opacity-20 blur-md"></div>

      {/* Subtle grid pattern */}
      <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
    </div>
  )
}

interface QRCodeDialogProps {
  children: React.ReactNode
  urlInfo: Urls
}

const QRCodeDialog = ({ urlInfo, children }: QRCodeDialogProps) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const fullScreenRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("qr-code")

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shrinkily.vercel.app"
  const fullUrl = `${baseUrl}/${urlInfo.shortUrl}`

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange)
    }
  }, [])

  const handleDownloadQR = async () => {
    try {
      setIsDownloading(true)
      const svg = document.getElementById("qr-code")
      if (!svg) throw new Error("QR Code element not found")

      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
      })

      canvas.width = img.width * 2
      canvas.height = img.height * 2
      ctx?.scale(2, 2)
      ctx?.drawImage(img, 0, 0)

      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `Shrinkily-${urlInfo.shortUrl}.png`
      downloadLink.href = pngFile
      downloadLink.click()

      toast.success(t("downloadSuccess"))
    } catch (error) {
      toast.error(t("downloadError"))
      console.error(error)
    } finally {
      setIsDownloading(false)
    }
  }

  const toggleFullScreen = async () => {
    try {
      if (!isFullScreen) {
        // Enter fullscreen
        if (fullScreenRef.current) {
          if (fullScreenRef.current.requestFullscreen) {
            await fullScreenRef.current.requestFullscreen()
          } else if ((fullScreenRef.current as any).webkitRequestFullscreen) {
            await (fullScreenRef.current as any).webkitRequestFullscreen()
          } else if ((fullScreenRef.current as any).msRequestFullscreen) {
            await (fullScreenRef.current as any).msRequestFullscreen()
          }
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen()
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error)
      toast.error(t("fullScreenError") || "Failed to toggle fullscreen mode")
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setIsCopied(true)
      toast.success(t("copySuccess") || "URL copied to clipboard!")
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      toast.error(t("copyError") || "Failed to copy URL")
      console.error(error)
    }
  }

  const shareUrl = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Shrinkily - Shortened URL",
          text: "Check out this shortened URL",
          url: fullUrl,
        })
        toast.success(t("shareSuccess") || "URL shared successfully!")
      } else {
        await copyToClipboard()
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-violet-500">{t("qrTitle")}</DialogTitle>
            <DialogDescription className="text-blue-violet-500">{t("qrDescription")}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-6 p-6">
            <div className="rounded-xl border-2 border-blue-violet-100 bg-white p-6 shadow-md dark:bg-gravel-950 transition-all duration-300 hover:shadow-lg">
              <QRCode
                id="qr-code"
                size={240}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={fullUrl}
                viewBox={`0 0 256 256`}
                className="h-auto w-full"
                fgColor="#000000"
                bgColor="transparent"
                level="Q"
              />
            </div>

            <div className="w-full space-y-2 text-center">
              <p className="text-sm text-blue-violet-500">Your shortened URL</p>
              <p className="select-all rounded-lg bg-blue-violet-50 px-4 py-2 font-mono text-sm text-blue-violet-500 shadow-inner">
                {urlInfo.shortUrl}
              </p>
            </div>
          </div>

          <DialogFooter className="flex flex-wrap justify-end gap-2">
            <Button
              onClick={toggleFullScreen}
              variant="outline"
              className="border-2 border-blue-violet-200 text-blue-violet-600 hover:bg-blue-violet-50"
            >
              <Maximize2 className="mr-2 h-4 w-4" />
              {t("fullScreen") || "Full Screen"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="border-2 border-gravel-200 text-gravel-700 hover:bg-gravel-50">
                {t("close")}
              </Button>
            </DialogClose>
            <Button
              onClick={handleDownloadQR}
              disabled={isDownloading}
              className={cn(
                "bg-blue-violet-600 text-white shadow-md",
                "hover:bg-blue-violet-700",
                "disabled:bg-gravel-400",
                "transition-all duration-300",
              )}
            >
              {isDownloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <DownloadIcon className="mr-2 h-4 w-4" />
              )}
              {t("downloadPng")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* This div is always in the DOM but only visible when in fullscreen mode */}
      <div
        ref={fullScreenRef}
        className={cn(
          "flex h-screen w-screen flex-col items-center justify-center bg-white dark:bg-gravel-950 relative",
          !isFullScreen && "hidden", // Hide when not in fullscreen
        )}
      >
        <BackgroundDecoration />
        <div className="absolute right-8 top-8 z-10">
          <Button
            variant="ghost"
            onClick={toggleFullScreen}
            className="flex items-center gap-2 rounded-full bg-blue-violet-50 px-4 py-2 text-blue-violet-600 hover:bg-blue-violet-100 transition-colors duration-300 shadow-md"
          >
            <Minimize2 className="h-5 w-5" />
            <span>{t("exitFullScreen") || "Exit Full Screen"}</span>
          </Button>
        </div>

        <div className="flex max-w-md flex-col items-center space-y-12 p-6 text-center z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-bold text-blue-violet-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-violet-500 to-dull-lavender-500">
              Shrinkily
            </h2>
          </div>

          <div className="rounded-xl border-4 border-blue-violet-100 bg-white p-10 shadow-xl dark:bg-gravel-950 transition-all duration-500 hover:shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-violet-200/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <QRCode
              size={400}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={fullUrl}
              viewBox={`0 0 256 256`}
              className="h-auto w-full relative z-10"
              fgColor="#000000"
              bgColor="transparent"
              level="Q"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-medium text-blue-violet-500 select-all bg-blue-violet-50/50 px-4 py-2 rounded-lg">
                {fullUrl}
              </p>
            </div>
            <p className="text-lg text-blue-violet-400 animate-pulse">{t("scanToVisit") || "Scan to visit"}</p>
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              onClick={handleDownloadQR}
              disabled={isDownloading}
              className="bg-blue-violet-600 text-white hover:bg-blue-violet-700 transition-colors"
            >
              {isDownloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <DownloadIcon className="mr-2 h-4 w-4" />
              )}
              {t("downloadPng")}
            </Button>
          </div>

          <div className="mt-auto pt-12 flex items-center justify-center gap-2">
            <p className="text-lg font-light text-blue-violet-300">{t("designBy") || "Design by José Pablo"}</p>
            <img src="/Logo.svg" alt="Logo" className="h-6" />
          </div>
        </div>
      </div>
    </>
  )
}

export default QRCodeDialog

