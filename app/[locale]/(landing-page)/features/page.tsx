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

  const tPage = useTranslations('feature-page');

  return (
    <div className="min-h-screen bg-dull-lavender-50">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-violet-800 text-center mb-4">
          {tPage('pageTitle')}
        </h1>
        <p className="text-xl text-gravel-600 text-center mb-12">
          {tPage('pageSubtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
