"use client"

import { Download, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { exportUrlsByUser } from "@/server/actions/urls";
import { useTransition } from "react";

export default function ExportURLsCard() {
  const [isPending, startTransition] = useTransition()

  const handleExport = async () => {
    startTransition(async () => {
      try {
        const response = await exportUrlsByUser()
        const csvContent = Array.isArray(response)
          ? response.map(item => item.url).join('\n')
          : 'Error exporting URLs'
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'urls.csv'
        a.click()

      } catch (error) {
        console.error(error)
      }
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gravel-900">Export URLs</CardTitle>
        <CardDescription>
          Export all your shortened URLs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleExport}
          className="bg-blue-violet-500 hover:bg-blue-violet-600 text-white"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              <span>Export all URLs</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card >
  )
}