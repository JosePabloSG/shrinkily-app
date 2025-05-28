import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/section-title";

export default function About() {
  const t = useTranslations('about-page');

  return (
    <div className="py-24 bg-dull-lavender-50 text-[#6B6B8D]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('pageTitle')}
          className="mb-16"
        />

        <section className="mb-16 animate-fade-in-up">
          <h3 className="text-2xl font-semibold text-blue-violet-600 mb-4">
            {t('projectDescription.title')}
          </h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            {t.raw('projectDescription.paragraphs').map((paragraph: string, index: number) => (
              <p key={index} className={index < t.raw('projectDescription.paragraphs').length - 1 ? 'mb-4' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-16 animate-fade-in-up">
          <h3 className="text-2xl font-semibold text-blue-violet-600 mb-4">
            {t('openSource.title')}
          </h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="mb-4">
              {t('openSource.description')}
            </p>
            <Link
              href="https://github.com/JosePabloSG/Shrinkily-app"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-black transition-colors duration-300"
            >
              <FaGithub className="mr-2" />
              {t('openSource.repositoryButton')}
            </Link>
          </div>
        </section>

        <section className="animate-fade-in-up">
          <h3 className="text-2xl font-semibold text-blue-violet-600 mb-4">
            {t('developer.title')}
          </h3>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
            <Image
              src="/profile.jpg"
              alt={t('developer.name')}
              width={200}
              height={200}
              className="rounded-full mb-4 md:mb-0 md:mr-6 border-8 border-beauty-bush-200"
            />
            <div>
              <h4 className="text-xl font-semibold mb-2">
                {t('developer.name')}
              </h4>
              <p>
                {t('developer.description')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}