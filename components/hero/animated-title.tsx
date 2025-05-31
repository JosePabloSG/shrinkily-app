"use client"

import { motion } from "framer-motion"
import { calistoga } from "@/lib/fonts"

interface AnimatedTitleProps {
  firstPart: string
  highlightedPart: string
  description: string
}

export function AnimatedTitle({ firstPart, highlightedPart, description }: AnimatedTitleProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0.3, 1] }}
      className="text-center space-y-6"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gravel-900 leading-tight">
        {firstPart}{" "}
        <span className={`${calistoga.className} text-blue-violet-500 inline-block`}>{highlightedPart}</span>
      </h1>
      <p className="text-lg md:text-xl text-gravel-700 max-w-2xl mx-auto leading-relaxed">{description}</p>
    </motion.header>
  )
}
