import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
      <h1 className="text-9xl font-display font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-primary text-primary-foreground hover:bg-secondary hover:-translate-y-1 transition-all duration-300 gold-glow">
        <Home className="w-5 h-5" />
        Return Home
      </Link>
    </div>
  );
}
