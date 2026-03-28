"use client";

/**
 * Skip link that scrolls to #main-content without appending a hash to the URL.
 * A plain href="#main-content" turns /contact into /contact#main-content on tap,
 * which is confusing when users expect a clean path.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link pointer-events-none focus-visible:pointer-events-auto"
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById("main-content");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => el?.focus({ preventScroll: true }), 100);
      }}
    >
      Skip to main content
    </a>
  );
}
