"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaGithub, FaInstagram, FaDiscord, FaLinkedinIn } from "react-icons/fa";

const socialLinks = [
  { name: "GitHub", icon: FaGithub, url: "https://github.com/JosePabloSG", hoverColor: "hover:text-[#181717]" },
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/josepablo.sg", hoverColor: "group-hover:from-[#F58529] group-hover:to-[#D6008C] hover:text-transparent bg-gradient-to-r" },
  { name: "Discord", icon: FaDiscord, url: "https://discordapp.com/users/797265640335343616", hoverColor: "hover:text-[#7289DA]" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "https://www.linkedin.com/in/JosePabloSG", hoverColor: "hover:text-[#0077B5]" },
];

export default function Contact() {
  const t = useTranslations("contact-page");
  return (
    <div className="min-h-screen bg-dull-lavender-50 text-dull-lavender-900">
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-blue-violet-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="text-lg text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t("description")}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <link.icon
                className={`text-4xl mb-2 ${link.hoverColor} transition-colors duration-300`}
              />
              <span className="text-sm font-medium">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </main>
    </div>
  );
}
