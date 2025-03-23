"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  DownloadIcon,
  Loader2,
  Maximize2,
  Share2,
  Copy,
  RefreshCw,
  BookmarkIcon,
  Undo2,
  Palette,
  CropIcon,
  ImageIcon,
  CheckIcon,
} from "lucide-react"

import { Dialog, DialogContent, DialogTitle, DialogClose, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { DEFAULT_QR_STYLES, type COLOR_PRESETS, calculateMaxLogoSize, type QRStylesType } from "./constants"
import { QRPreview } from "./qr-preview"
import { FullscreenView } from "./fullscreen-view"
import { ColorTab } from "./color-tab"
import { SizeTab } from "./size-tab"
import { LogoTab } from "./logo-tab"
import { SaveTab } from "./save-tab"
import { Urls } from "@prisma/client"
import { useTranslations } from "next-intl"

interface QRCodeEditorDialogProps {
  children: React.ReactNode
  url?: string
  shortId?: string
  urlInfo?: Urls
}

const QRCodeEditor = ({ url, shortId = "custom", urlInfo, children }: QRCodeEditorDialogProps) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [qrStyles, setQrStyles] = useState<QRStylesType>(DEFAULT_QR_STYLES)
  const [previousQrStyles, setPreviousQrStyles] = useState<QRStylesType>(DEFAULT_QR_STYLES)
  const [savedStyles, setSavedStyles] = useState<Record<string, QRStylesType>>({})
  const [currentStyleName, setCurrentStyleName] = useState("")
  const [stylesLoaded, setStylesLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("colors")
  const t = useTranslations("qr-code-editor")

  const fullScreenRef = useRef<HTMLDivElement>(null!)
  const qrContainerRef = useRef<HTMLDivElement>(null!)

  const fullUrl = url || (urlInfo?.url || "")

  // Load saved styles from localStorage
  useEffect(() => {
    const loadStyles = () => {
      try {
        // Load global saved styles first
        const savedStylesStr = localStorage.getItem("qrCodeSavedStyles")
        if (savedStylesStr) {
          const styles = JSON.parse(savedStylesStr)
          setSavedStyles(styles || {})
        }

        // Then try to load URL-specific style if available
        if (shortId && shortId !== "custom") {
          const urlSpecificStyleStr = localStorage.getItem(`qrCode_${shortId}`)
          if (urlSpecificStyleStr) {
            const urlSpecificStyle = JSON.parse(urlSpecificStyleStr)
            setQrStyles(urlSpecificStyle)
            setPreviousQrStyles(urlSpecificStyle)
            setStylesLoaded(true)
            return
          }
        }

        // Fall back to last used style if no URL-specific style is found
        const lastStyleStr = localStorage.getItem("qrCodeLastStyle")
        if (lastStyleStr) {
          const lastStyle = JSON.parse(lastStyleStr)
          setQrStyles(lastStyle)
          setPreviousQrStyles(lastStyle)
        }

        setStylesLoaded(true)
      } catch (error) {
        console.error("Error loading saved QR styles:", error)
        setSavedStyles({})
        setStylesLoaded(true)
      }
    }

    loadStyles()
  }, [shortId])

  // Save current style to localStorage when it changes
  useEffect(() => {
    if (stylesLoaded) {
      // Always save as the last used style
      localStorage.setItem("qrCodeLastStyle", JSON.stringify(qrStyles))

      // If we have a specific shortId, also save as URL-specific style
      if (shortId && shortId !== "custom") {
        localStorage.setItem(`qrCode_${shortId}`, JSON.stringify(qrStyles))
      }
    }
  }, [qrStyles, stylesLoaded, shortId])

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

  // Auto-adjust error correction level when logo is enabled
  useEffect(() => {
    if (qrStyles.logoEnabled && qrStyles.level !== "H" && stylesLoaded) {
      setPreviousQrStyles(qrStyles)
      setQrStyles({ ...qrStyles, level: "H" })
    }
  }, [qrStyles.logoEnabled, qrStyles, stylesLoaded])

  const handleDownloadQR = async () => {
    try {
      setIsDownloading(true)

      // We'll render the QR code with its container to include styling
      const container = qrContainerRef.current
      if (!container) throw new Error("QR Code container not found")

      // Use html-to-image library if available or fallback to canvas method
      const svg = document.getElementById("qr-code")
      if (!svg) throw new Error("QR Code element not found")

      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Could not get canvas context")

      // Create an image that includes the container's styling
      const containerRect = container.getBoundingClientRect()
      canvas.width = containerRect.width * 2
      canvas.height = containerRect.height * 2

      // Fill background
      ctx.fillStyle = qrStyles.bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const img = new Image()
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
      })

      ctx?.scale(2, 2)

      // Center the QR code in the canvas
      const xOffset = (containerRect.width - qrStyles.size) / 2
      const yOffset = (containerRect.height - qrStyles.size) / 2

      ctx?.drawImage(img, xOffset, yOffset)

      // If logo is enabled, draw the logo
      if (qrStyles.logoEnabled && qrStyles.logoUrl) {
        const logoImg = new Image()
        await new Promise((resolve, reject) => {
          logoImg.onload = resolve
          logoImg.onerror = reject
          logoImg.src = qrStyles.logoUrl
        })

        // Calculate logo position to be centered
        const logoX = (containerRect.width - qrStyles.logoSize) / 2
        const logoY = (containerRect.height - qrStyles.logoSize) / 2

        // Draw logo background
        ctx.fillStyle = qrStyles.logoBackgroundColor
        ctx.beginPath()
        ctx.roundRect(logoX, logoY, qrStyles.logoSize, qrStyles.logoSize, qrStyles.logoRadius)
        ctx.fill()

        // Draw the logo
        ctx?.drawImage(logoImg, logoX, logoY, qrStyles.logoSize, qrStyles.logoSize)
      }

      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `QR-${shortId}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    } catch (error) {
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
    }
  }

  const copyToClipboard = async () => {
    try {
      if (!fullUrl) return
      await navigator.clipboard.writeText(fullUrl)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error(error)
    }
  }

  const shareUrl = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Shared QR Code URL",
          text: "Check out this URL",
          url: fullUrl,
        })
      } else {
        await copyToClipboard()
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const saveCurrentStyle = () => {
    if (!currentStyleName.trim()) {
      return
    }

    const newSavedStyles = {
      ...savedStyles,
      [currentStyleName]: { ...qrStyles },
    }

    setSavedStyles(newSavedStyles)
    localStorage.setItem("qrCodeSavedStyles", JSON.stringify(newSavedStyles))
    setCurrentStyleName("")
  }

  const loadSavedStyle = (styleName: string) => {
    const style = savedStyles[styleName]
    if (style) {
      setPreviousQrStyles(qrStyles)
      setQrStyles(style)
    }
  }

  const deleteSavedStyle = (styleName: string) => {
    const { [styleName]: _, ...restStyles } = savedStyles
    setSavedStyles(restStyles)
    localStorage.setItem("qrCodeSavedStyles", JSON.stringify(restStyles))
  }

  const resetToDefault = () => {
    setPreviousQrStyles(qrStyles)
    setQrStyles(DEFAULT_QR_STYLES)
  }

  const undoChanges = () => {
    setQrStyles(previousQrStyles)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          // Calcular un tamaño de logo seguro basado en el nivel de corrección actual
          const safeLogoSize = Math.min(60, calculateMaxLogoSize(qrStyles.size, qrStyles.level))

          setPreviousQrStyles(qrStyles)
          setQrStyles({
            ...qrStyles,
            logoUrl: event.target.result as string,
            logoEnabled: true,
            logoSize: safeLogoSize,
            level: "H", // Establecer automáticamente el nivel de corrección más alto
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const applyColorPreset = (preset: (typeof COLOR_PRESETS)[0]) => {
    setPreviousQrStyles(qrStyles)
    setQrStyles({
      ...qrStyles,
      fgColor: preset.fg,
      bgColor: preset.bg,
    })
  }


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-4xl p-0 gap-0 overflow-hidden">
          <DialogTitle className="sr-only">QR Code Editor</DialogTitle>
          <div className="flex flex-col md:flex-row h-[85vh] md:h-[650px] max-h-[85vh]">
            {/* Preview Panel - Always visible */}
            <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-between bg-gradient-to-b from-slate-50 to-primary/5 overflow-auto">
              <div className="w-full">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {t("title")}
                </h2>
                <p className="text-sm text-primary/80 mb-4">
                  {t("subtitle")}
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center w-full">
                <QRPreview qrStyles={qrStyles} url={fullUrl ?? ""} containerRef={qrContainerRef} />
              </div>

              <div className="w-full mt-4">
                <div className="w-full space-y-2 text-center">
                  <p className="text-sm text-primary/80">
                    {t("yourUrl")}
                  </p>
                  <p className="select-all rounded-lg bg-primary/5 px-4 py-2 font-mono text-sm text-primary/80 shadow-inner">
                    {urlInfo?.shortUrl}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={toggleFullScreen}
                          variant="outline"
                          size="icon"
                          className="border-2 border-primary/20 text-primary hover:bg-primary/5"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("buttons.fullscreenMode")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={copyToClipboard}
                          variant="outline"
                          size="icon"
                          className="border-2 border-primary/20 text-primary hover:bg-primary/5"
                        >
                          {isCopied ? <CheckIcon className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("buttons.copyUrl")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={shareUrl}
                          variant="outline"
                          size="icon"
                          className="border-2 border-primary/20 text-primary hover:bg-primary/5"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("buttons.shareUrl")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            {/* Editor Panel */}
            <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col">
              {/* Tool Tabs */}
              <div className="flex border-b border-gray-200">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeTab === "colors" ? "default" : "ghost"}
                        onClick={() => setActiveTab("colors")}
                        className={cn(
                          "flex-1 rounded-none border-b-2 py-2 h-14",
                          activeTab === "colors"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-transparent text-gray-500",
                        )}
                      >
                        <Palette className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Colors</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeTab === "size" ? "default" : "ghost"}
                        onClick={() => setActiveTab("size")}
                        className={cn(
                          "flex-1 rounded-none border-b-2 py-2 h-14",
                          activeTab === "size"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-transparent text-gray-500",
                        )}
                      >
                        <CropIcon className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Size & Shape</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeTab === "logo" ? "default" : "ghost"}
                        onClick={() => setActiveTab("logo")}
                        className={cn(
                          "flex-1 rounded-none border-b-2 py-2 h-14",
                          activeTab === "logo"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-transparent text-gray-500",
                        )}
                      >
                        <ImageIcon className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Logo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeTab === "save" ? "default" : "ghost"}
                        onClick={() => setActiveTab("save")}
                        className={cn(
                          "flex-1 rounded-none border-b-2 py-2 h-14",
                          activeTab === "save"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-transparent text-gray-500",
                        )}
                      >
                        <BookmarkIcon className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Saved Styles</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Editor Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "colors" && (
                  <ColorTab
                    qrStyles={qrStyles}
                    setPreviousQrStyles={setPreviousQrStyles}
                    setQrStyles={setQrStyles}
                    applyColorPreset={applyColorPreset}
                  />
                )}

                {activeTab === "size" && (
                  <SizeTab qrStyles={qrStyles} setPreviousQrStyles={setPreviousQrStyles} setQrStyles={setQrStyles} />
                )}

                {activeTab === "logo" && (
                  <LogoTab
                    qrStyles={qrStyles}
                    setPreviousQrStyles={setPreviousQrStyles}
                    setQrStyles={setQrStyles}
                    handleLogoUpload={handleLogoUpload}
                  />
                )}

                {activeTab === "save" && (
                  <SaveTab
                    currentStyleName={currentStyleName}
                    setCurrentStyleName={setCurrentStyleName}
                    savedStyles={savedStyles}
                    saveCurrentStyle={saveCurrentStyle}
                    loadSavedStyle={loadSavedStyle}
                    deleteSavedStyle={deleteSavedStyle}
                  />
                )}
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-gray-200 p-4 flex justify-between items-center bg-gray-50">
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={undoChanges}
                          className="text-primary border-primary/20"
                        >
                          <Undo2 className="h-4 w-4 mr-1" />
                          {t("buttons.undo")}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("buttons.undoTooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetToDefault}
                          className="text-gray-600 border-gray-200"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          {t("buttons.reset")}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("buttons.resetTooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <DialogClose asChild>
                  <Button variant={'primary'} onClick={handleDownloadQR} >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    {t("buttons.downloadQr")}
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Mode */}
      {urlInfo && (
        <FullscreenView
          fullScreenRef={fullScreenRef}
          isFullScreen={isFullScreen}
          toggleFullScreen={toggleFullScreen}
          qrStyles={qrStyles}
          urlInfo={urlInfo}
          handleDownloadQR={handleDownloadQR}
          isDownloading={isDownloading}
          fullUrl={fullUrl} // Pasar la URL completa
        />
      )}
    </>
  )
}

export default QRCodeEditor

