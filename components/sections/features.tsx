"use client"

import FeatureCard from "@/components/landing-page/features/feature-card"
import { Link, ArrowRightLeft, BarChart2, QrCode, Eye, Pencil } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function Features() {
  const t = useTranslations("feature-page")

  const features = [
    {
      title: t("featuresList.urlShortening.title"),
      description: t("featuresList.urlShortening.description"),
      icon: Link,
    },
    {
      title: t("featuresList.redirection.title"),
      description: t("featuresList.redirection.description"),
      icon: ArrowRightLeft,
    },
    {
      title: t("featuresList.linkPreview.title"),
      description: t("featuresList.linkPreview.description"),
      icon: Eye,
    },
    {
      title: t("featuresList.customAliases.title"),
      description: t("featuresList.customAliases.description"),
      icon: Pencil,
    },
    {
      title: t("featuresList.qrCodeGeneration.title"),
      description: t("featuresList.qrCodeGeneration.description"),
      icon: QrCode,
    },
    {
      title: t("featuresList.clickTracking.title"),
      description: t("featuresList.clickTracking.description"),
      icon: BarChart2,
    },
  ]

  // Improved animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smoother animation
      },
    },
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100/20 dark:bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div variants={titleVariants} className="inline-block">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              {t("badgeTitle")}
            </span>
          </motion.div>

          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">
              {t("pageTitle")}
            </span>
          </motion.h2>

          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            {t("pageSubtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
