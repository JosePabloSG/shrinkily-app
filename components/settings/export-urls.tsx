"use client"
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function ExportURLsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gravel-900">Export URLs</CardTitle>
        <CardDescription>
          Export all your shortened URLs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="bg-blue-violet-500 hover:bg-blue-violet-600 text-white">
          <Download className="mr-2 h-4 w-4" />
          Export all URLs
        </Button>
      </CardContent>
    </Card>
  )
}