import { Category } from "@shared/schema";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Music, 
  Briefcase, 
  Palette, 
  Heart, 
  Cpu
} from "lucide-react";

type CategoryCardProps = {
  category: Category;
  className?: string;
};

const CategoryIcons: Record<string, any> = {
  "Networking": Users,
  "Music": Music,
  "Business": Briefcase,
  "Arts": Palette,
  "Health": Heart,
  "Technology": Cpu,
};

export function CategoryCard({ category, className }: CategoryCardProps) {
  const IconComponent = CategoryIcons[category.name] || Users;
  
  const colorClasses: Record<string, { bg: string, hoverBg: string, text: string }> = {
    primary: {
      bg: "bg-primary-100 dark:bg-primary-900/30",
      hoverBg: "group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50",
      text: "text-primary-600 dark:text-primary-400"
    },
    secondary: {
      bg: "bg-secondary-100 dark:bg-secondary-900/30",
      hoverBg: "group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800/50",
      text: "text-secondary-600 dark:text-secondary-400"
    },
    accent: {
      bg: "bg-accent-100 dark:bg-accent-900/30",
      hoverBg: "group-hover:bg-accent-200 dark:group-hover:bg-accent-800/50",
      text: "text-accent-600 dark:text-accent-400"
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      hoverBg: "group-hover:bg-green-200 dark:group-hover:bg-green-800/50",
      text: "text-green-600 dark:text-green-400"
    },
    yellow: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      hoverBg: "group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/50",
      text: "text-yellow-600 dark:text-yellow-400"
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/30",
      hoverBg: "group-hover:bg-red-200 dark:group-hover:bg-red-800/50",
      text: "text-red-600 dark:text-red-400"
    }
  };
  
  const colors = colorClasses[category.color] || colorClasses.primary;
  
  return (
    <a 
      href="#" 
      className={cn(
        "bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300 group",
        className
      )}
    >
      <div 
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200",
          colors.bg,
          colors.hoverBg
        )}
      >
        <IconComponent className={cn("h-6 w-6", colors.text)} />
      </div>
      <h3 className="font-medium">{category.name}</h3>
    </a>
  );
}
