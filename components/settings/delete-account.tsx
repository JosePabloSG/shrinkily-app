"use client"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function DeleteAccountCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gravel-900">Delete account</CardTitle>
        <CardDescription>
          Permanently delete your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" className="bg-beauty-bush-100 text-beauty-bush-700 hover:bg-beauty-bush-200">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </CardContent>
    </Card>
  )
}