import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dull-lavender-50 text-[#6B6B8D]">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-blue-violet-600 mb-12 animate-fade-in">
          About QuickShrink
        </h1>

        <section className="mb-16 animate-fade-in-up">
          <h2 className="text-2xl font-semibold text-blue-violet-600 mb-4">Project Description</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="mb-4">
              QuickShrink is a powerful and easy-to-use URL shortener that enables users to convert long URLs into short, shareable links. Whether you're a business, developer, or content creator, QuickShrink simplifies your URL management with additional features such as custom links, click tracking, and expiration dates.
            </p>
            <p className="mb-4">
              URL shortening is essential for simplifying and tracking online links. QuickShrink makes it simple to manage URLs efficiently, benefiting businesses, marketers, and developers by streamlining their workflow.
            </p>
            <p>
              As a developer, QuickShrink offers an open-source platform to easily integrate URL shortening into your applications or websites. The project is designed to be flexible, efficient, and customizable, making it ideal for personal and professional use.
            </p>
          </div>
        </section>

        <section className="mb-16 animate-fade-in-up">
          <h2 className="text-2xl font-semibold text-blue-violet-600 mb-4">Open Source & Contribution</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="mb-4">
              QuickShrink is an open-source project, and we welcome contributions from developers around the world. If you're passionate about improving URL management, check out the repository, contribute, or report issues. Together, we can make QuickShrink even better!
            </p>
            <Link
              href="https://github.com/JosePabloSG/quickshrink-app"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-black transition-colors duration-300"
            >
              <FaGithub className="mr-2" />
              View Repository
            </Link>
          </div>
        </section>

        <section className="animate-fade-in-up">
          <h2 className="text-2xl font-semibold text-blue-violet-600 mb-4">About the Developer</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
            <Image
              src="/profile.jpg"
              alt="José Pablo Suárez Gómez"
              width={200}
              height={200}
              className="rounded-full mb-4 md:mb-0 md:mr-6 border-8 border-beauty-bush-200"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">José Pablo Suárez Gómez</h3>
              <p>
                Hi, I'm José Pablo Suárez Gómez, a passionate Frontend Developer. I've spent several years working with modern web technologies, and I created QuickShrink as a tool to help others simplify URL management. Through this project, I've enhanced my skills in backend development with NestJS, frontend with Next.js, and working with MySQL databases. I'm always learning and eager to contribute to the development community.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

