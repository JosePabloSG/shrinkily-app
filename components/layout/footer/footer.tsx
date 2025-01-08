import Link from "next/link";

// Quick Links Navigation
const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Contact", href: "/contact" },
];

// Legal Links
const LEGAL_LINKS = [
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

const Footer = () => {
  return (
    <footer className="bg-dull-lavender-100 text-gravel-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-blue-violet-600">
              QuickShrink
            </Link>
            <p className="mt-1 text-sm">
              Simplify your links, amplify your reach. QuickShrink makes sharing easy with instant, reliable, and customized short URLs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-violet-800">Quick Links</h3>
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
            <h3 className="text-lg font-semibold mb-3 text-blue-violet-800">Legal</h3>
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

          <div className="text-sm text-gravel-600">
            © {new Date().getFullYear()} QuickShrink. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

