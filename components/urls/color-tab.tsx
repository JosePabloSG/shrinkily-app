"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { COLOR_PRESETS, QR_CORRECTION_LEVELS, type QRStylesType } from "./constants"
import { useTranslations } from "next-intl"

interface ColorTabProps {
  qrStyles: QRStylesType
  setPreviousQrStyles: (styles: QRStylesType) => void
  setQrStyles: (styles: QRStylesType) => void
  applyColorPreset: (preset: (typeof COLOR_PRESETS)[0]) => void
}

export const ColorTab = ({ qrStyles, setPreviousQrStyles, setQrStyles, applyColorPreset }: ColorTabProps) => {
  const t = useTranslations("color-tab")
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-primary">
        {t("title")}
      </h3>

      {/* Color Presets */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {t("colorPresets.label")}
        </Label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((preset) => (
            <TooltipProvider key={preset.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => applyColorPreset(preset)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: preset.bg }}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.fg }}></div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{preset.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fgColor" className="flex justify-between">
            <span>
              {t("qrCodeColor.label")}
            </span>
            <span className="text-xs text-gray-500">{qrStyles.fgColor}</span>
          </Label>
          <div className="flex">
            <Input
              id="fgColor"
              type="color"
              value={qrStyles.fgColor}
              onChange={(e) => {
                setPreviousQrStyles(qrStyles)
                setQrStyles({ ...qrStyles, fgColor: e.target.value })
              }}
              className="w-12 h-10 p-1 mr-2"
            />
            <Input
              type="text"
              value={qrStyles.fgColor}
              onChange={(e) => {
                setPreviousQrStyles(qrStyles)
                setQrStyles({ ...qrStyles, fgColor: e.target.value })
              }}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bgColor" className="flex justify-between">
            <span>
              {t("backgroundColor.label")}
            </span>
            <span className="text-xs text-gray-500">{qrStyles.bgColor}</span>
          </Label>
          <div className="flex">
            <Input
              id="bgColor"
              type="color"
              value={qrStyles.bgColor}
              onChange={(e) => {
                setPreviousQrStyles(qrStyles)
                setQrStyles({ ...qrStyles, bgColor: e.target.value })
              }}
              className="w-12 h-10 p-1 mr-2"
            />
            <Input
              type="text"
              value={qrStyles.bgColor}
              onChange={(e) => {
                setPreviousQrStyles(qrStyles)
                setQrStyles({ ...qrStyles, bgColor: e.target.value })
              }}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level" className="flex justify-between">
          <span>
            {t("errorCorrectionLevel.label")}
          </span>
          {qrStyles.logoEnabled && qrStyles.level !== "H" && (
            <span className="text-xs text-destructive font-medium">
              {t("errorCorrectionLevel.recommendWithLogo")}
            </span>
          )}
        </Label>
        <Select
          value={qrStyles.level}
          onValueChange={(value) => {
            setPreviousQrStyles(qrStyles)
            setQrStyles({ ...qrStyles, level: value })
          }}
        >
          <SelectTrigger
            id="level"
            className={cn("w-full", qrStyles.logoEnabled && qrStyles.level !== "H" && "border-destructive")}
          >
            <SelectValue placeholder="Select a level" />
          </SelectTrigger>
          <SelectContent>
            {QR_CORRECTION_LEVELS.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label} {level.value === "H" && qrStyles.logoEnabled && "✓"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          {t("errorCorrectionLevel.description")}
          {qrStyles.logoEnabled && (
            <span className="font-medium text-primary"> 
              {t("errorCorrectionLevel.recommendWithLogo")}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

