"use client"

import Image from "next/image"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ExternalLink, Code, UserCircle } from "lucide-react"
import SectionTitle from "@/components/ui/section-title"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  const t = useTranslations("about-page")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <section className="py-24 ">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Page Title */}
          <motion.div variants={itemVariants} className="text-center">
            <SectionTitle
              title={t("pageTitle")}
              className="mb-16"
              titleClassName="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            />
          </motion.div>

          {/* Developer Section */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-dull-lavender-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-violet-50/50 to-water-leaf-50/50 opacity-50" />
              <CardContent className="relative z-10 p-8">
                <div className="flex items-center mb-6 space-x-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-violet-100 text-blue-violet-700">
                    <UserCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-violet-800">{t("developer.title")}</h3>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32">
                      <Image
                        src="/profile.jpg"
                        alt={t("developer.name")}
                        width={128}
                        height={128}
                        className="rounded-full border-4 border-white shadow-lg w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-blue-violet-800 mb-3">{t("developer.name")}</h4>
                    <p className="text-dull-lavender-700 leading-relaxed">{t("developer.description")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Description */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-dull-lavender-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-violet-50/50 to-water-leaf-50/50 opacity-50" />
              <CardContent className="relative z-10 p-8">
                <div className="flex items-center mb-6 space-x-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-water-leaf-100 text-water-leaf-700">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-violet-800">{t("projectDescription.title")}</h3>
                </div>

                <div className="space-y-4">
                  {t.raw("projectDescription.paragraphs").map((paragraph: string, index: number) => (
                    <motion.p
                      key={index}
                      className="text-dull-lavender-700 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Open Source Section */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-dull-lavender-200 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-violet-50/50 to-water-leaf-50/50 opacity-50" />
              <CardContent className="relative z-10 p-8">
                <div className="flex items-center mb-6 space-x-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-beauty-bush-100 text-beauty-bush-700">
                    <FaGithub className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-violet-800">{t("openSource.title")}</h3>
                </div>

                <p className="text-dull-lavender-700 leading-relaxed mb-6">{t("openSource.description")}</p>

                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="https://github.com/JosePabloSG/Shrinkily-app"
                    className="inline-flex items-center px-6 py-3 bg-beauty-bush-500 hover:bg-beauty-bush-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium group"
                  >
                    <FaGithub className="mr-2 w-5 h-5" />
                    <span>{t("openSource.repositoryButton")}</span>
                    <ExternalLink className="ml-2 w-4 h-4 opacity-70 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
