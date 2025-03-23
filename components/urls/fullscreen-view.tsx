"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Loader2, DownloadIcon, Minimize2 } from "lucide-react"
import QRCode from "react-qr-code"
import { cn } from "@/lib/utils"
import type { QRStylesType } from "./constants"
import { BackgroundDecoration } from "./background-decoration"
import { Urls } from "@prisma/client"
import { useTranslations } from "next-intl"

interface FullscreenViewProps {
  fullScreenRef: React.RefObject<HTMLDivElement>
  isFullScreen: boolean
  toggleFullScreen: () => Promise<void>
  qrStyles: QRStylesType
  urlInfo: Urls
  handleDownloadQR: () => Promise<void>
  isDownloading: boolean
  fullUrl: string
}

export const FullscreenView = ({
  fullScreenRef,
  isFullScreen,
  toggleFullScreen,
  qrStyles,
  urlInfo,
  handleDownloadQR,
  isDownloading,
  fullUrl,
}: FullscreenViewProps) => {
  const t = useTranslations("qr-code-editor")
  return (
    <div
      ref={fullScreenRef}
      className={cn(
        "flex h-screen w-screen flex-col items-center justify-center bg-white dark:bg-gray-950 relative",
        !isFullScreen && "hidden", // Hide when not in fullscreen
      )}
    >
      <BackgroundDecoration />
      <div className="absolute right-8 top-8 z-10">
        <Button
          variant="ghost"
          onClick={toggleFullScreen}
          className="flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-primary hover:bg-primary/10 transition-colors duration-300 shadow-md"
        >
          <Minimize2 className="h-5 w-5" />
          <span>{t("buttons.exitFullscreen")}</span>
        </Button>
      </div>

      <div className="flex max-w-md flex-col items-center space-y-12 p-6 text-center z-10">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-blue-violet-500">
            QR Code
          </h2>
        </div>

        <div
          className="rounded-xl border-4 shadow-xl transition-all duration-500 hover:shadow-2xl relative group"
          style={{
            backgroundColor: qrStyles.bgColor,
            borderColor: "rgba(124, 58, 237, 0.1)",
            padding: qrStyles.borderSize * 1.5,
            borderRadius: qrStyles.borderRadius * 1.5,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <QRCode
            size={480}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={fullUrl}
            viewBox={`0 0 256 256`}
            className="h-auto w-full relative z-10"
            fgColor={qrStyles.fgColor}
            bgColor="transparent"
            level={qrStyles.level as "L" | "M" | "Q" | "H"}
          />

          {qrStyles.logoEnabled && qrStyles.logoUrl && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: qrStyles.logoSize * 2,
                height: qrStyles.logoSize * 2,
                backgroundColor: qrStyles.logoBackgroundColor,
                borderRadius: qrStyles.logoRadius * 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                zIndex: 20,
              }}
            >
              <img
                src={qrStyles.logoUrl || "/placeholder.svg"}
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                }}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <p className="text-xl font-medium text-primary/80 select-all bg-primary/5 px-4 py-2 rounded-lg">
              {urlInfo.shortUrl}
            </p>
          </div>
          <p className="text-lg text-primary/70 animate-pulse">
            {t("buttons.scanToVisit")}
          </p>
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            onClick={handleDownloadQR}
            disabled={isDownloading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-full px-6 py-3 shadow-md cursor-pointer"
          >
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <DownloadIcon className="mr-2 h-4 w-4" />
            )}
            Download PNG
          </Button>
        </div>
      </div>
    </div>
  )
}

