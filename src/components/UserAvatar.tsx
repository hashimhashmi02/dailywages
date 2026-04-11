import { getInitials } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  isOnline?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-14 h-14 text-lg",
  xl: "w-16 h-16 text-xl",
};

const dotSizes = {
  sm: "w-3 h-3 border-[1.5px]",
  md: "w-3.5 h-3.5 border-2",
  lg: "w-4 h-4 border-2",
  xl: "w-5 h-5 border-2",
};

export default function UserAvatar({
  name,
  size = "md",
  isOnline,
  className = "",
}: UserAvatarProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-2xl gradient-primary flex items-center justify-center text-white font-bold`}
      >
        {getInitials(name)}
      </div>
      {isOnline !== undefined && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 ${dotSizes[size]} ${
            isOnline ? "bg-green-500" : "bg-slate-400"
          } border-white rounded-full`}
          aria-label={isOnline ? "Online" : "Offline"}
        />
      )}
    </div>
  );
}
