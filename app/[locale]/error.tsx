"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HomeIcon, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-dull-lavender-50">
      {/* Top crescent */}
      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-b-[100%] w-full" />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-8">
            <motion.div
              animate={{
                rotate: [0, 360],
                transition: { duration: 2, repeat: Infinity, ease: "linear" },
              }}
              className="inline-block"
            >
              <RefreshCcw className="h-16 w-16 text-blue-violet-500" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gravel-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-xl text-gravel-700 mb-8 max-w-2xl">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 bg-blue-violet-500 text-white rounded-lg font-semibold hover:bg-blue-violet-600 transition-all duration-300 ease-in-out"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-violet-500 rounded-lg font-semibold hover:bg-gray-50 border border-blue-violet-200 transition-all duration-300 ease-in-out"
          >
            <HomeIcon className="mr-2 h-5 w-5" />
            Return Home
          </Link>
        </motion.div>

        {process.env.NODE_ENV === "development" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-white rounded-lg shadow-lg max-w-2xl w-full"
          >
            <p className="text-red-500 font-mono text-sm break-all">
              {error.message}
            </p>
          </motion.div>
        )}
      </main>

      {/* Bottom crescent */}
      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-t-[100%] w-full mt-auto" />
    </div>
  );
}