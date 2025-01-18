
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Shield, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";

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

const PrivacyPolicy: React.FC = () => {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const sections: Section[] = [
    {
      title: "1. Basic Project Information",
      content: [
        "Project Name: QuickShrink",
        "Contact Email: suarezgomezjosepablo03@gmail.com",
        "If you have any questions or wish to exercise your rights regarding your personal data, you can contact us at this email address.",
      ],
    },
    {
      title: "2. Data We Collect",
      content: [
        "We automatically collect the following personal data when you log in to our platform:",
        "• Name",
        "• Email address",
        "• Profile picture",
        "Note: We do not collect technical data such as IP address, cookies, or device information, nor do we collect sensitive data such as government IDs or financial information.",
      ],
    },
    {
      title: "3. How and When We Collect Data",
      content: [
        "We collect the aforementioned data automatically through integrations with third-party services like Google or GitHub during the login process.",
        "We do not use external tools such as Google Analytics or Facebook Pixel to collect additional information.",
      ],
    },
    {
      title: "4. Use of Data",
      content: [
        "The data we collect is used exclusively to:",
        "• Provide access to the platform through authentication.",
        "We do not use your data for analytics, statistics, marketing, or to send promotional emails or notifications.",
      ],
    },
    {
      title: "5. Sharing Data with Third Parties",
      content: [
        "Your data is not shared with third parties. All the information we collect is stored securely in our database and is not sold or transferred under any circumstances.",
      ],
    },
    {
      title: "6. Data Protection",
      content: [
        "We implement technical and organizational measures to ensure the security of your information:",
        "• Secure Storage: Your data is stored in a database protected against unauthorized access.",
        "• Data Management Tools: We provide options for you to create and delete your data easily.",
        "We comply with applicable regulations, such as GDPR and CCPA, ensuring you can manage your rights over your data.",
      ],
    },
    {
      title: "7. Data Retention",
      content: [
        "We retain your personal data as long as your account is active. If you decide to delete your account, your data will be automatically deleted 30 days after account closure.",
      ],
    },
    {
      title: "8. User Rights",
      content: [
        "You have the following rights concerning your personal data:",
        "• Access: You can request a copy of the data we have about you.",
        "• Deletion: You can request that we delete your data.",
        "To exercise these rights, email us at suarezgomezjosepablo03@gmail.com.",
      ],
    },
    {
      title: "9. Use of Cookies",
      content: [
        "We currently do not use cookies or similar technologies to collect additional information about your browsing.",
      ],
    },
    {
      title: "10. Use by Minors",
      content: [
        "QuickShrink is not designed for or directed at individuals under 18 years of age. We do not knowingly collect data from minors. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete it.",
      ],
    },
    {
      title: "11. Policy Updates",
      content: [
        "This Privacy Policy is updated annually or when significant changes are made to how we handle your data. We will notify you of any updates via email.",
        "Last Updated: January 4, 2025",
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

      <header className="container mx-auto px-4 py-6 -mt-16 md:-mt-24 relative z-10">
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 -mt-8 md:-mt-16 relative z-10">
        <Link href="/" className="inline-flex items-center text-gravel-900 hover:text-blue-violet-700 transition-colors">
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
                <Shield className="w-8 h-8 text-blue-violet-600" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-blue-violet-800 text-center mb-8">QuickShrink Privacy Policy</h1>

            <p className="text-gravel-700 mb-8 text-center">
              At QuickShrink, we value and respect your privacy. This Privacy Policy describes how we collect, use, and protect your personal information when you use our service. By using our platform, you agree to the practices described in this policy.
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
          </motion.div>
        </div>
      </main>

      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-t-[100%] w-full mt-auto" />

      <footer className="bg-dull-lavender-300 py-6">
        <div className="container mx-auto px-4 text-center text-gravel-700">
          © 2025 QuickShrink. All rights reserved.
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

export default PrivacyPolicy;
