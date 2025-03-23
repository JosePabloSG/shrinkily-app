"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { QRStylesType } from "./constants"
import { useTranslations } from "next-intl"

interface SizeTabProps {
  qrStyles: QRStylesType
  setPreviousQrStyles: (styles: QRStylesType) => void
  setQrStyles: (styles: QRStylesType) => void
}

export const SizeTab = ({ qrStyles, setPreviousQrStyles, setQrStyles }: SizeTabProps) => {
  const t = useTranslations("size-tab")
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-primary">
        {t("title")}
      </h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="size">
              {t("qrCodeSize.label")}
            </Label>
            <span className="text-sm text-gray-500">{qrStyles.size}
              {t("qrCodeSize.unit")}
            </span>
          </div>
          <Slider
            id="size"
            min={100}
            max={400}
            step={10}
            value={[qrStyles.size]}
            onValueChange={(value) => {
              setPreviousQrStyles(qrStyles)
              setQrStyles({ ...qrStyles, size: value[0] })
            }}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="borderSize">
              {t("margin.label")}
            </Label>
            <span className="text-sm text-gray-500">{qrStyles.borderSize}
              {t("margin.unit")}
            </span>
          </div>
          <Slider
            id="borderSize"
            min={0}
            max={50}
            step={1}
            value={[qrStyles.borderSize]}
            onValueChange={(value) => {
              setPreviousQrStyles(qrStyles)
              setQrStyles({ ...qrStyles, borderSize: value[0] })
            }}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="borderRadius">
              {t("cornerRounding.label")}
            </Label>
            <span className="text-sm text-gray-500">{qrStyles.borderRadius}
              {t("cornerRounding.unit")}
            </span>
          </div>
          <Slider
            id="borderRadius"
            min={0}
            max={50}
            step={1}
            value={[qrStyles.borderRadius]}
            onValueChange={(value) => {
              setPreviousQrStyles(qrStyles)
              setQrStyles({ ...qrStyles, borderRadius: value[0] })
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

