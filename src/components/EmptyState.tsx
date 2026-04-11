import { Search as SearchIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ElementType;
}

export default function EmptyState({
  title,
  description,
  icon: Icon = SearchIcon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-5">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
    </div>
  );
}
