"use client"

import { useState, useTransition } from "react"
import { Trash2, Loader2 } from 'lucide-react'
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import toast from "react-hot-toast"
import { handleSignOut } from "@/server/actions/auth"
import { DeletAccount } from "@/server/actions/account"

interface Props {
  email: string
}

export default function DeleteAccountCard({ email }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirmEmail !== email) return;

    startTransition(async () => {
      try {
        const response = await DeletAccount();

        if (response.success) {
          toast.success(response.message);
          setIsDialogOpen(false);
          setConfirmEmail("");

          // Handle signout
          try {
            await handleSignOut();
          } catch (signOutError) {
            console.error("Sign out error:", signOutError);
            // Continue with UI feedback even if signout fails
          }
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Delete account error:", error);
        toast.error("An error occurred while deleting your account");
      }
    });
  };

  const isEmailConfirmed = confirmEmail === email

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gravel-900">Delete account</CardTitle>
        <CardDescription>
          Permanently delete your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="bg-beauty-bush-100 text-beauty-bush-700 hover:bg-beauty-bush-200">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-2">
                Please type your email address to confirm:
              </p>
              <Input
                type="email"
                placeholder={email}
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setConfirmEmail("")
                }}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={!isEmailConfirmed || isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Deleting account...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete account</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}