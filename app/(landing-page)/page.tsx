"use client";

import { motion } from "framer-motion";
import Link from "next/link";
export default function Home() {

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
          <h1 className="text-4xl md:text-5xl font-bold text-gravel-900 mb-4">
            Simplify Your Links
          </h1>
          <p className="text-xl text-gravel-700 mb-8 max-w-2xl">
            QuickShrink makes sharing easy with instant, reliable, and customized short URLs.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md md:max-w-lg"
        >
          <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
            <input
              type="url"
              placeholder="Enter your long URL here..."
              className="flex-grow px-4 py-3 md:py-4 bg-white text-gravel-900 focus:outline-none focus:ring-2 focus:ring-blue-violet-400 transition-all duration-300 ease-in-out"
              required
            />
            <button
              type="submit"
              className="bg-blue-violet-500 text-white px-6 py-3 md:py-4 font-semibold hover:bg-blue-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-violet-400 focus:ring-offset-2 transition-all duration-300 ease-in-out"
            >
              <Link href="/dashboard/urls">
                Shorten URL
              </Link>
            </button>
          </div>
        </motion.form>
      </main>

      {/* Bottom crescent */}
      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-t-[100%] w-full mt-auto" />
    </div>
  );
}

