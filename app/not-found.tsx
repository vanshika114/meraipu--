import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground mb-4">
        404 — Page not found
      </h1>
      <p className="text-muted-foreground mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
