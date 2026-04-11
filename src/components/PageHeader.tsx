import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  backHref: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, backHref, children }: PageHeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={backHref}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
        </div>
        {children}
      </div>
    </header>
  );
}
