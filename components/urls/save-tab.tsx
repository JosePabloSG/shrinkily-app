"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, CheckIcon } from "lucide-react"
import type { QRStylesType } from "./constants"
import { useTranslations } from "next-intl"

interface SaveTabProps {
  currentStyleName: string
  setCurrentStyleName: (name: string) => void
  savedStyles: Record<string, QRStylesType>
  saveCurrentStyle: () => void
  loadSavedStyle: (styleName: string) => void
  deleteSavedStyle: (styleName: string) => void
  shortId?: string // Add shortId prop
  saveStyleForCurrentUrl?: () => void // Add a function to save for current URL
}

export const SaveTab = ({
  currentStyleName,
  setCurrentStyleName,
  savedStyles,
  saveCurrentStyle,
  loadSavedStyle,
  deleteSavedStyle,
  shortId,
  saveStyleForCurrentUrl
}: SaveTabProps) => {
  const t = useTranslations("save-tab")
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-primary">
        {t("title")}
      </h3>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Input
            placeholder={t("styleName.placeholder")}
            value={currentStyleName}
            onChange={(e) => setCurrentStyleName(e.target.value)}
            className="flex-1"
          />
          <div className="flex space-x-2">
            <Button
              onClick={saveCurrentStyle}
              variant={'primary'}
              className="flex-1 w-full text-xs md:text-sm py-1 md:py-2"
            >
              <Save className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              {t("saveButtons.saveGlobally")}
            </Button>
          </div>
        </div>

        {shortId && shortId !== "custom" && (
          <div className="pt-1 pb-3 border-b border-gray-100">
            <Button
              onClick={saveStyleForCurrentUrl}
              variant="outline"
              className="w-full text-xs md:text-sm py-1 md:py-2 border-primary/20 text-primary"
            >
              <Save className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              {t("saveButtons.saveForThisUrl")}
            </Button>
          </div>
        )}

        {Object.keys(savedStyles).length > 0 ? (
          <div className="space-y-2 mt-3">
            <Label>{t("savedStyles.label")}</Label>
            <div className="max-h-[180px] overflow-y-auto space-y-2">
              {Object.entries(savedStyles).map(([name, _]) => (
                <div
                  key={name}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 md:p-3 bg-gray-50 rounded-md border border-gray-200"
                >
                  <span className="font-medium truncate max-w-full sm:max-w-[150px] mb-1 sm:mb-0">{name}</span>
                  <div className="flex space-x-1 md:space-x-2 mt-1 sm:mt-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => loadSavedStyle(name)}
                      className="h-7 md:h-8 px-1 md:px-2 text-xs flex-1 sm:flex-none"
                    >
                      <CheckIcon className="h-3 w-3 mr-1" />
                      {t("savedStyles.actions.apply")}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteSavedStyle(name)}
                      className="h-7 md:h-8 px-1 md:px-2 text-xs"
                    >
                      {t("savedStyles.actions.delete")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-4 md:p-6 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-xs md:text-sm text-gray-500 italic">
              {t("savedStyles.emptyState")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

