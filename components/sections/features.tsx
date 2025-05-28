"use client";
import FeatureCard from "@/components/landing-page/features/feature-card";
import SectionTitle from "@/components/ui/section-title";
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

  return (
    <div className="py-24 ">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={t('pageTitle')}
          subtitle={t('pageSubtitle')}
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.03,
                ease: [0.2, 0, 0.3, 1]
              }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
