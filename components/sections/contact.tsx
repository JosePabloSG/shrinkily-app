"use client"

import { motion } from "framer-motion"
import { Mail, Phone } from "lucide-react"
import { calistoga } from "@/lib/fonts"

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Respondemos todos los emails en 24 horas.",
    contact: "suarezgomezjosepablo03@gmail.com",
    href: "mailto:suarezgomezjosepablo03@gmail.com",
    ariaLabel: "Enviar email a suarezgomezjosepablo03@gmail.com",
  },
  {
    icon: Phone,
    title: "Teléfono",
    description: "Estamos disponibles Lun-Vie, 9am-6pm.",
    contact: "+506 6525 1906",
    href: "tel:+50665251906",
    ariaLabel: "Llamar al +506 6525 1906",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
      ease: [0.2, 0, 0.3, 1],
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.2, 0, 0.3, 1],
    },
  },
}

export default function Contact() {
  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Header */}
          <motion.header variants={itemVariants} className="space-y-4">
            <div className="relative inline-block">
              <h2
                id="contact-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gravel-900 leading-tight relative z-10"
              >
                Ponte en <span className={`${calistoga.className} text-blue-violet-500`}>Contacto</span>
              </h2>
  
            </div>
            <p className="text-lg md:text-xl text-gravel-700 leading-relaxed">
              Contacta al equipo de soporte de nuestro startup.
            </p>
          </motion.header>

          {/* Contact Methods */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
            {contactMethods.map((method) => {
              const IconComponent = method.icon
              return (
                <motion.div key={method.title} variants={itemVariants} className="space-y-6">
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-gravel-900" aria-hidden="true" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-gravel-900">{method.title}</h3>

                    <p className="text-gravel-700 leading-relaxed">{method.description}</p>

                    <a
                      href={method.href}
                      className="inline-block text-gravel-900 font-medium hover:text-blue-violet-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-violet-500 focus:ring-offset-2 rounded-md px-1 py-1"
                      aria-label={method.ariaLabel}
                    >
                      {method.contact}
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
