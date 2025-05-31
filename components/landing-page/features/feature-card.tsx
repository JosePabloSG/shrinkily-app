import { type LucideIcon } from "lucide-react";
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export default function FeatureCard({ title, description, icon: Icon, index }: FeatureCardProps) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1 + 0.3,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1 + 0.5,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.25, 0.25, 0.75] }
      }}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
      
      <div className="relative z-10">
        {/* Icon container */}
        <motion.div 
          variants={iconVariants}
          className="mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <Icon className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={textVariants}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </motion.div>

        {/* Hover indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 w-0 group-hover:w-full transition-all duration-500 ease-out"
          initial={false}
        />
      </div>
    </motion.div>
  );
}
