"use client";

import { Send, FileText, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";

export default function Docs() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = useTranslations('docs-page');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mjkrbedb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">

      {/* Loading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="h-full bg-water-leaf-400 animate-[progress_3s_ease-in-out_infinite] w-full opacity-80" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <SectionTitle
              title={t('pageTitle')}
              subtitle={t('description')}
              className="mb-16"
              titleClassName="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              subtitleClassName="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            />
          </motion.div>

          {/* Docs Coming Soon Card */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <Card className="relative overflow-hidden bg-white/70 backdrop-blur-sm border-dull-lavender-200 shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-violet-50/50 to-water-leaf-50/50 opacity-50" />
              <CardContent className="relative z-10 p-8 text-center">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  className="flex justify-center mb-6"
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-violet-100 text-blue-violet-700">
                    <FileText className="w-8 h-8" />
                  </div>
                </motion.div>
                <h3 className="mb-4 text-2xl font-bold text-blue-violet-800">
                  {t('pageTitle')}
                </h3>
                <p className="mb-6 text-dull-lavender-700">
                  {t('description')}
                </p>
                <motion.a
                  href="#notify"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center text-blue-violet-700 hover:text-blue-violet-900 font-medium group"
                >
                  <span>
                    {t('notifyButton')}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email Notification Form */}
          <motion.div variants={itemVariants} id="notify">
            <div className="relative p-8 mb-12 bg-white/80 backdrop-blur-md border border-dull-lavender-200 rounded-2xl shadow-lg">
              <h3 className="mb-6 text-2xl font-semibold text-blue-violet-800">
                {isSubmitted ? t("thankYouTitle") : t("stayUpdatedTitle")}
              </h3>

              {!isSubmitted ? (
                <>
                  <p className="mb-6 text-dull-lavender-700 max-w-lg mx-auto">
                    <span className="block mb-2">{t("stayUpdatedDescription")}</span>
                    <span className="block text-sm">{t("stayUpdatedDescriptionSpanish")}</span>
                  </p>
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1 group">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('emailPlaceholder')}
                          className="w-full px-6 py-3 rounded-lg bg-white border border-dull-lavender-300 text-blue-violet-900 placeholder-dull-lavender-500 focus:outline-none focus:ring-2 focus:ring-water-leaf-400 transition-all shadow-sm focus:shadow-md"
                          required
                          disabled={isSubmitting}
                        />
                        <div className="h-0.5 w-0 bg-water-leaf-500 absolute bottom-0 left-0 transition-all duration-300 group-hover:w-full" />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-6 py-3 rounded-lg bg-beauty-bush-500 hover:bg-beauty-bush-600 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-75' : ''}`}
                      >
                        <span>{isSubmitting ? t('sending') || 'Sending...' : t('notifyButton')}</span>
                        <Send className={`w-4 h-4 transition-all ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
                      </motion.button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="mb-4 text-blue-violet-700">
                    <span className="block font-medium">{t("thankYouText1")}</span>
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-beauty-bush-600 hover:text-beauty-bush-700 text-sm underline"
                  >
                    {t("subscribeAnother")}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-dull-lavender-500"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-blue-violet-400"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="w-2 h-2 rounded-full bg-blue-violet-400"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.4,
              }}
              className="w-2 h-2 rounded-full bg-blue-violet-400"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

