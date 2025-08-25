import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations('layout.footer');

  const QUICK_LINKS = [
    { name: t('quickLinks.home'), href: "/" },
    { name: t('quickLinks.features'), href: "/features" },
    { name: t('quickLinks.contact'), href: "/contact" },
  ];

  const LEGAL_LINKS = [
    { name: t('legalLinks.termsOfService'), href: "/terms" },
    { name: t('legalLinks.privacyPolicy'), href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-dull-lavender-100 text-gravel-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-blue-violet-600">
              Shrinkily
            </Link>
            <p className="mt-1 text-sm">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-violet-800">
              {t('quickLinksTitle')}
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-blue-violet-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-violet-800">
              {t('legalTitle')}
            </h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-blue-violet-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section with social icons and copyright */}
        <div className="mt-6 pt-6 border-t border-dull-lavender-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gravel-600">{t("copyright", { year: new Date().getFullYear() })}</div>
          <div className="flex items-center mt-4 md:mt-0">
            <Link
              href="https://www.hikaricr.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image src="/images/powered_by_hikari.svg" alt="Powered by Hikari" width={180} height={45} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;