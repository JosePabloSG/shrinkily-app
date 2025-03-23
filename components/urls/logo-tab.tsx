"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, UploadIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { type QRStylesType, calculateMaxLogoSize } from "./constants"
import { useTranslations } from "next-intl"

interface LogoTabProps {
  qrStyles: QRStylesType
  setPreviousQrStyles: (styles: QRStylesType) => void
  setQrStyles: (styles: QRStylesType) => void
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const LogoTab = ({ qrStyles, setPreviousQrStyles, setQrStyles, handleLogoUpload }: LogoTabProps) => {
  const t = useTranslations("logo-tab")
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-primary">
        {t("title")}
      </h3>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="logoEnabled"
            checked={qrStyles.logoEnabled}
            onCheckedChange={(checked) => {
              setPreviousQrStyles(qrStyles)
              setQrStyles({ ...qrStyles, logoEnabled: checked })
            }}
          />
          <Label htmlFor="logoEnabled">{t("showLogo.label")}</Label>
        </div>

        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
          <p className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {t("warning.title")}
          </p>
          <ul className="ml-7 mt-1 list-disc space-y-1">
            <li>{t("warning.points.0")}</li>
            <li>{t("warning.points.1")}</li>
            <li>{t("warning.points.2")}</li>
          </ul>
        </div>

        {qrStyles.logoEnabled && (
          <>
            <Card className="bg-gray-50 border-dashed border-2">
              <CardContent className="p-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  {qrStyles.logoUrl ? (
                    <div className="relative w-20 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={qrStyles.logoUrl || "/placeholder.svg"}
                        alt="Logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}

                  <Label
                    htmlFor="logoUpload"
                    className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                  >
                    <UploadIcon className="mr-2 h-4 w-4" />
                    {qrStyles.logoUrl ? t("logoUpload.changeButton") : t("logoUpload.uploadButton")}
                  </Label>
                  <Input id="logoUpload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="logoSize">{t("logoSize.label")}</Label>
                  <span
                    className={cn(
                      "text-sm",
                      qrStyles.logoSize > calculateMaxLogoSize(qrStyles.size, qrStyles.level)
                        ? "text-destructive font-medium"
                        : "text-gray-500",
                    )}
                  >
                    {qrStyles.logoSize}{t("logoSize.unit")}
                    {qrStyles.logoSize > calculateMaxLogoSize(qrStyles.size, qrStyles.level) &&
                      ` (${t("logoSize.warningText")})`}
                  </span>
                </div>
                <Slider
                  id="logoSize"
                  min={20}
                  max={Math.min(80, Math.floor(qrStyles.size * 0.3))}
                  step={5}
                  value={[qrStyles.logoSize]}
                  onValueChange={(value) => {
                    setPreviousQrStyles(qrStyles)
                    setQrStyles({ ...qrStyles, logoSize: value[0] })
                  }}
                  className="w-full"
                />
                <div className="flex items-center mt-1">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      qrStyles.logoSize <= calculateMaxLogoSize(qrStyles.size, qrStyles.level) * 0.7
                        ? "bg-green-500"
                        : qrStyles.logoSize <= calculateMaxLogoSize(qrStyles.size, qrStyles.level)
                          ? "bg-yellow-500"
                          : "bg-red-500",
                    )}
                  ></div>
                  <p className="text-xs text-gray-500">
                    {qrStyles.logoSize <= calculateMaxLogoSize(qrStyles.size, qrStyles.level) * 0.7
                      ? t("logoSize.status.optimal")
                      : qrStyles.logoSize <= calculateMaxLogoSize(qrStyles.size, qrStyles.level)
                        ? t("logoSize.status.acceptable")
                        : t("logoSize.status.tooLarge")}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="logoRadius">{t("logoCornerRounding.label")}</Label>
                  <span className="text-sm text-gray-500">{qrStyles.logoRadius}{t("logoCornerRounding.unit")}</span>
                </div>
                <Slider
                  id="logoRadius"
                  min={0}
                  max={30}
                  step={1}
                  value={[qrStyles.logoRadius]}
                  onValueChange={(value) => {
                    setPreviousQrStyles(qrStyles)
                    setQrStyles({ ...qrStyles, logoRadius: value[0] })
                  }}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoBgColor" className="flex justify-between">
                  <span>{t("logoBackground.label")}</span>
                  <span className="text-xs text-gray-500">{qrStyles.logoBackgroundColor}</span>
                </Label>
                <div className="flex">
                  <Input
                    id="logoBgColor"
                    type="color"
                    value={qrStyles.logoBackgroundColor}
                    onChange={(e) => {
                      setPreviousQrStyles(qrStyles)
                      setQrStyles({ ...qrStyles, logoBackgroundColor: e.target.value })
                    }}
                    className="w-12 h-10 p-1 mr-2"
                  />
                  <Input
                    type="text"
                    value={qrStyles.logoBackgroundColor}
                    onChange={(e) => {
                      setPreviousQrStyles(qrStyles)
                      setQrStyles({ ...qrStyles, logoBackgroundColor: e.target.value })
                    }}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

