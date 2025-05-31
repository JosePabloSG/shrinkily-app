"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  center?: boolean
}

export default function SectionTitle({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  center = true
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0.3, 1] }}
      className={cn("space-y-4", center && "text-center", className)}
    >
      <div className="relative inline-block">
        <h2 className={cn(
          "text-4xl md:text-5xl font-bold text-blue-violet-800 relative z-10",
          titleClassName
        )}>
          {title}
        </h2>
        {/* Marcador highlight */}
        <div className="absolute -bottom-2 left-0 w-full h-6 bg-blue-violet-200/70 -z-10 transform -rotate-1"></div>
      </div>
      {subtitle && (
        <p className={cn(
          "text-xl text-gravel-600 max-w-3xl",
          center && "mx-auto",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
