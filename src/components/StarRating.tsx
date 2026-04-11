import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md";
  showValue?: boolean;
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
};

export default function StarRating({
  rating,
  max = 5,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  return (
    <div className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-slate-200"
          }`}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-semibold text-foreground">
          {rating}
        </span>
      )}
    </div>
  );
}
