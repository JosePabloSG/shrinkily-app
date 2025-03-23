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
              className="flex-1 w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              {t("saveButtons.saveGlobally")}
            </Button>
            {shortId && shortId !== "custom" && (
              <Button
                onClick={saveStyleForCurrentUrl}
                variant={'primary'}
              >
                <Save className="mr-2 h-4 w-4" />
                {t("saveButtons.saveForThisUrl")}
              </Button>
            )}
          </div>
        </div>

        {Object.keys(savedStyles).length > 0 ? (
          <div className="space-y-3 mt-4">
            <Label>{t("savedStyles.label")}</Label>
            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {Object.entries(savedStyles).map(([name, _]) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
                >
                  <span className="font-medium truncate max-w-[150px]">{name}</span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => loadSavedStyle(name)}
                      className="h-8 px-2 text-xs"
                    >
                      <CheckIcon className="h-3 w-3 mr-1" />
                      {t("savedStyles.actions.apply")}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteSavedStyle(name)}
                      className="h-8 px-2 text-xs"
                    >
                      {t("savedStyles.actions.delete")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-6 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-sm text-gray-500 italic">
              {t("savedStyles.emptyState")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

