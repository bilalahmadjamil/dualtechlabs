import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center bg-portal-mesh px-6 py-24 text-center">
      <p className="font-sans text-sm font-semibold text-cyan-400/90">404</p>
      <h1 className="portal-headline mt-5 text-2xl tracking-tight text-white md:text-3xl">
        Page not found
      </h1>
      <p className="portal-body-muted mt-3 max-w-md">
        That link doesn&apos;t exist anymore, or the address was mistyped.
      </p>
      <Link href="/" className="portal-cta-primary mt-10">
        Go to homepage
      </Link>
    </div>
  );
}
