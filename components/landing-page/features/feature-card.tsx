import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export default function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-blue-violet-500 mr-3" />
        <h2 className="text-xl font-semibold text-blue-violet-800">{title}</h2>
      </div>
      <p className="text-gravel-600">{description}</p>
    </div>
  );
}

