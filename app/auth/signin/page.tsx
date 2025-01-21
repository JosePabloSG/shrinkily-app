import { auth } from "@/auth";
import ProvidersLogin from "@/components/auth/providers-login";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SigninPage() {
  const session = await auth()

  if (session) {
    redirect("/dashboard/urls")
  }

  return (
    <>
      <h1 className="text-center text-4xl md:text-5xl font-bold text-gravel-900 mb-4 ">
        Welcome to Shrinkily
      </h1>
      <p className="text-center text-xl text-gravel-700 mb-8 max-w-2xl">
        Log in securely and start simplifying your links.
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full max-w-md md:max-w-lg p-8">
          <div className="space-y-4">
            <ProvidersLogin />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gravel-600">
          By continuing, you agree to Shrinkily's{" "}
          <Link
            href="/terms"
            className="font-medium text-blue-violet-600 hover:text-blue-violet-500"
          >
            Terms of Service
          </Link>{" "}
        </p>
      </Suspense>
    </>
  )
}