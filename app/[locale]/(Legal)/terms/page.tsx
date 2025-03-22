
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, FileText, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";

interface Section {
  title: string;
  content: string[];
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: number;
  setActiveSection: (index: number) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, activeSection, setActiveSection }) => (
  <nav className="hidden lg:block sticky top-8 self-start bg-white rounded-lg shadow-lg p-6 mr-8">
    <h2 className="text-xl font-semibold text-blue-violet-800 mb-4">Table of Contents</h2>
    <ul className="space-y-2">
      {sections.map((section, index) => (
        <li key={index}>
          <a
            href={`#section-${index}`}
            className={`block py-1 px-2 rounded transition-colors ${activeSection === index
              ? "bg-blue-violet-100 text-blue-violet-800"
              : "text-gravel-600 hover:bg-dull-lavender-50"
              }`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setActiveSection(index);
              const element = document.getElementById(`section-${index}`);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

interface SectionProps {
  section: Section;
  index: number;
  isOpen: boolean;
  toggleSection: (index: number) => void;
}

const Section: React.FC<SectionProps> = ({ section, index, isOpen, toggleSection }) => (
  <motion.section
    id={`section-${index}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="mb-8"
  >
    <h2
      className="text-2xl font-semibold text-blue-violet-700 mb-4 flex justify-between items-center cursor-pointer"
      onClick={() => toggleSection(index)}
    >
      {section.title}
      {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
    </h2>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-dull-lavender-50 rounded-lg p-4"
      >
        {section.content.map((paragraph, pIndex) => (
          <p key={pIndex} className="text-gravel-700 mb-2">
            {paragraph}
          </p>
        ))}
      </motion.div>
    )}
  </motion.section>
);

const TermsAndConditions: React.FC = () => {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const sections: Section[] = [
    {
      title: "1. General Information",
      content: [
        "Service Provider: Shrinkily",
        "Contact Email: suarezgomezjosepablo03@gmail.com",
        "Shrinkily provides a URL shortening service with advanced features such as QR code generation and customizable creator pages. Use of this service is subject to these Terms and Conditions.",
      ],
    },
    {
      title: "2. Acceptance of Terms",
      content: [
        "By creating an account or using the platform, you confirm that you:",
        "• Are at least 18 years old.",
        "• Agree to comply with these terms and any applicable laws or regulations.",
        "If you do not agree to these terms, you must not use our services.",
      ],
    },
    {
      title: "3. User Responsibilities",
      content: [
        "As a user of Shrinkily, you agree to:",
        "• Provide accurate and up-to-date information during registration.",
        "• Use the service only for lawful purposes.",
        "• Refrain from creating or sharing malicious, harmful, or illegal content through shortened URLs.",
        "Shrinkily reserves the right to suspend or terminate accounts that violate these terms.",
      ],
    },
    {
      title: "4. Prohibited Uses",
      content: [
        "You must not use Shrinkily for any of the following purposes:",
        "• Distributing malware, phishing attempts, or harmful software.",
        "• Sharing copyrighted content without proper authorization.",
        "• Engaging in activities that violate the rights of others or applicable laws.",
        "Violation of these prohibited uses may result in immediate suspension or legal action.",
      ],
    },
    {
      title: "5. Service Availability",
      content: [
        "Shrinkily strives to provide uninterrupted access to the platform but does not guarantee:",
        "• Continuous, error-free operation.",
        "• The accuracy or reliability of generated URLs.",
        "Shrinkily may temporarily suspend services for maintenance, updates, or unforeseen issues without prior notice.",
      ],
    },
    {
      title: "6. Intellectual Property",
      content: [
        "All content, logos, and trademarks associated with Shrinkily are the exclusive property of the service provider. Users may not:",
        "• Copy, modify, or distribute any part of the platform.",
        "• Use Shrinkily's branding for personal or commercial purposes without prior consent.",
      ],
    },
    {
      title: "7. Limitation of Liability",
      content: [
        "Shrinkily is not responsible for:",
        "• Damages arising from the misuse of shortened URLs.",
        "• Losses due to service interruptions, errors, or unauthorized access.",
        "Use the platform at your own risk.",
      ],
    },
    {
      title: "8. Modifications to the Terms",
      content: [
        "Shrinkily reserves the right to update these Terms and Conditions at any time. Changes will be communicated via email or posted on the platform. Continued use of the service after updates signifies acceptance of the revised terms.",
      ],
    },
    {
      title: "9. Governing Law",
      content: [
        "These Terms and Conditions are governed by the laws of [Your Country/State]. Any disputes will be resolved in the courts of [Your Country/State].",
      ],
    },
    {
      title: "10. Contact Information",
      content: [
        "For questions or concerns about these terms, please contact us at:",
        "Email: suarezgomezjosepablo03@gmail.com",
      ],
    },
  ];

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-dull-lavender-50">
      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-b-[100%] w-full" />

      <main className="flex-grow container mx-auto px-4 py-8 -mt-8 md:-mt-16 relative z-10">
        <Link href="/" className="inline-flex items-center text-gravel-900 hover:text-blue-violet-700 transition-colors cursor-pointer">
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <div className="flex flex-col lg:flex-row">
          <TableOfContents sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 flex-grow"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-violet-100 p-3 rounded-full">
                <FileText className="w-8 h-8 text-blue-violet-600" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-blue-violet-800 text-center mb-8">Shrinkily Terms and Conditions</h1>

            <p className="text-gravel-700 mb-8 text-center">
              Welcome to Shrinkily! By accessing or using our platform, you agree to be bound by the following terms and conditions. Please read them carefully before using our services.
            </p>

            {sections.map((section, index) => (
              <Section
                key={index}
                section={section}
                index={index}
                isOpen={openSections.includes(index)}
                toggleSection={toggleSection}
              />
            ))}

            <div className="mt-8 text-center">
              <p className="text-gravel-700">
                By using Shrinkily, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
              </p>
              <p className="text-gravel-700 mt-4">
                <strong>Last Updated:</strong> January 4, 2025
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-t-[100%] w-full mt-auto" />

      <footer className="bg-dull-lavender-300 py-6">
        <div className="container mx-auto px-4 text-center text-gravel-700">
          © 2025 Shrinkily. All rights reserved.
        </div>
      </footer>

      {showBackToTop && (
        <button
          className="fixed bottom-8 right-8 bg-blue-violet-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-violet-700 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default TermsAndConditions;
