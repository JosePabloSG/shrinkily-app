"use client";
import FeatureCard from "@/components/landing-page/features/feature-card";
import { Link, ArrowRightLeft, BarChart2, QrCode, Eye, Pencil } from "lucide-react";
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations('feature-page');

  const features = [
    {
      title: t('featuresList.urlShortening.title'),
      description: t('featuresList.urlShortening.description'),
      icon: Link
    },
    {
      title: t('featuresList.redirection.title'),
      description: t('featuresList.redirection.description'),
      icon: ArrowRightLeft
    },
    {
      title: t('featuresList.linkPreview.title'),
      description: t('featuresList.linkPreview.description'),
      icon: Eye
    },
    {
      title: t('featuresList.customAliases.title'),
      description: t('featuresList.customAliases.description'),
      icon: Pencil
    },
    {
      title: t('featuresList.qrCodeGeneration.title'),
      description: t('featuresList.qrCodeGeneration.description'),
      icon: QrCode
    },
    {
      title: t('featuresList.clickTracking.title'),
      description: t('featuresList.clickTracking.description'),
      icon: BarChart2
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  return (
    <section className="py-24 " >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            {t('pageTitle')}
          </motion.h2>
          <motion.p 
            variants={titleVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('pageSubtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
