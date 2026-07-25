import Link from "next/link";
import {
  BookOpen,
  BookMarked,
  Feather,
  Brain,
  Landmark,
  Smile,
  FlaskConical,
  GraduationCap,
  LucideIcon,
} from "lucide-react";
import { Category } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  "book-marked": BookMarked,
  feather: Feather,
  brain: Brain,
  landmark: Landmark,
  smile: Smile,
  "flask-conical": FlaskConical,
  "graduation-cap": GraduationCap,
};

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] ?? BookOpen;
  return (
    <Link
      href={`/explore?category=${encodeURIComponent(category.name)}`}
      className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-line bg-card px-4 py-8 text-center transition-colors hover:border-forest"
    >
      <span className="flex h-11 w-11 items-center justify-center text-forest">
        <Icon size={26} strokeWidth={1.6} />
      </span>
      <span className="font-serif text-[15px] font-medium text-ink">{category.name}</span>
    </Link>
  );
}
