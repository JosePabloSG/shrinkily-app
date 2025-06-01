"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SectionTitle from "@/components/ui/section-title"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function Testimonials() {
  const t = useTranslations("testimonials")

  const testimonials = [0, 1, 2, 3, 4, 5].map((index) => ({
    quote: t(`testimonials.${index}.quote`),
    name: t(`testimonials.${index}.name`),
    title: t(`testimonials.${index}.title`),
    avatar: t(`testimonials.${index}.avatar`) || "/placeholder.svg?height=40&width=40",
  }))

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            {t("badge")}
          </span>
          <SectionTitle
            title={t("title")}
            subtitle={t("subtitle")}
            className="mb-8"
          />
        </motion.div>

        {/* Testimonials Masonry Layout */}
        <div className="relative">
          {/* Masonry Grid usando CSS Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {/* Columna 1 */}
            <div className="space-y-6">
              {/* Tarjeta legible */}
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">"{testimonials[0].quote}"</blockquote>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonials[0].avatar || "/placeholder.svg"} alt={testimonials[0].name} />
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {testimonials[0].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonials[0].name}</div>
                      <div className="text-sm text-gray-600">{testimonials[0].title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tarjeta cortada */}
              <div className="bg-white border-t border-l border-r border-gray-200 overflow-hidden relative rounded-t-lg mt-16">
                <div className="h-40 overflow-hidden">
                  <div className="p-6">
                    <blockquote className="text-gray-700 mb-6 leading-relaxed">"{testimonials[3].quote}"</blockquote>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={testimonials[3].avatar || "/placeholder.svg"} alt={testimonials[3].name} />
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          {testimonials[3].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonials[3].name}</div>
                        <div className="text-sm text-gray-600">{testimonials[3].title}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white from-40% to-transparent"></div>
              </div>
            </div>

            {/* Columna 2 - Desplazada hacia abajo */}
            <div className="space-y-6 lg:mt-16">
              {/* Tarjeta legible */}
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">"{testimonials[1].quote}"</blockquote>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonials[1].avatar || "/placeholder.svg"} alt={testimonials[1].name} />
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {testimonials[1].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonials[1].name}</div>
                      <div className="text-sm text-gray-600">{testimonials[1].title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tarjeta cortada */}
              <div className="bg-white border-t border-l border-r border-gray-200 overflow-hidden relative rounded-t-lg mt-12">
                <div className="h-36 overflow-hidden">
                  <div className="p-6">
                    <blockquote className="text-gray-700 mb-6 leading-relaxed">"{testimonials[4].quote}"</blockquote>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={testimonials[4].avatar || "/placeholder.svg"} alt={testimonials[4].name} />
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          {testimonials[4].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonials[4].name}</div>
                        <div className="text-sm text-gray-600">{testimonials[4].title}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white from-40% to-transparent"></div>
              </div>
            </div>

            {/* Columna 3 */}
            <div className="space-y-6 lg:mt-8">
              {/* Tarjeta legible */}
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">"{testimonials[2].quote}"</blockquote>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonials[2].avatar || "/placeholder.svg"} alt={testimonials[2].name} />
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {testimonials[2].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonials[2].name}</div>
                      <div className="text-sm text-gray-600">{testimonials[2].title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tarjeta cortada */}
              <div className="bg-white border-t border-l border-r border-gray-200 overflow-hidden relative rounded-t-lg mt-20">
                <div className="h-32 overflow-hidden">
                  <div className="p-6">
                    <blockquote className="text-gray-700 mb-6 leading-relaxed">"{testimonials[5].quote}"</blockquote>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={testimonials[5].avatar || "/placeholder.svg"} alt={testimonials[5].name} />
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          {testimonials[5].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonials[5].name}</div>
                        <div className="text-sm text-gray-600">{testimonials[5].title}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white from-40% to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Overlay general de difuminado - solo en la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white from-25% to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}
