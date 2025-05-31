"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  index: number
}

export default function FeatureCard({ title, description, icon: Icon, index }: FeatureCardProps) {
  // Staggered entrance animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smoother animation
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ transition: { duration: 0.3 } }}
      className="group relative backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-2xl p-8 
                 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] 
                 border border-gray-100/50 dark:border-gray-800/50 overflow-hidden transition-all duration-300"
    >
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-110" />

      <div className="relative z-10">
        {/* Icon container with subtle animation */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl blur-md transform group-hover:scale-110 transition-transform duration-300" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
            <motion.div className="group-hover:rotate-12 transition-transform duration-300">
              <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" strokeWidth={1.75} />
            </motion.div>
          </div>
        </div>

        {/* Content with improved typography */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>
        </motion.div>

        {/* Animated underline indicator */}
        <motion.div
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-500 dark:to-purple-500"
        />
      </div>
    </motion.div>
  )
}
