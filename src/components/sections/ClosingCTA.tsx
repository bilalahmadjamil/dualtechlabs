"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getMailtoUrl, getWhatsAppUrl } from "@/config/contact";
import MagneticButton from "@/components/ui/MagneticButton";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ClosingCTA() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const mailtoUrl   = getMailtoUrl("Project Enquiry — DualTech Labs");
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1e0a3c 0%, #2d1264 30%, #7C3AED 65%, #0891B2 100%)",
      }}
    >
      {/* Radial highlight — centre glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="dtl-section relative z-10 flex flex-col items-center text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="font-display font-bold tracking-tight text-white"
          style={{
            fontSize: "clamp(1.9rem, 5vw, 3.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            maxWidth: "820px",
          }}
        >
          Got something you&apos;re trying to build?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg"
        >
          Drop us a message. Doesn&apos;t need to be polished — a rough idea is fine.
          We&apos;ll read it, and if we think we can help, we&apos;ll say so honestly.
        </motion.p>

        {/* Response time — appears before buttons */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.22 }}
          className="mt-5 font-sans text-xs text-white/60"
        >
          We respond within one business day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.32 }}
          className="mt-8 flex w-full flex-col items-center gap-4 md:w-auto md:flex-row"
        >
          {/* Primary — white bg with dark text, pops on dark gradient */}
          <MagneticButton
            as="a"
            href={mailtoUrl}
            className="w-full justify-center md:w-auto inline-flex items-center rounded-full px-7 py-3.5 font-sans text-sm tracking-wide transition-[filter,transform] duration-200 ease-out hover:brightness-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 sm:px-9 sm:py-4"
            style={{ background: "white", color: "#0F172A", fontWeight: 700 }}
            strength={0.3}
          >
            Email Us
          </MagneticButton>

          {/* Secondary — desktop: white outline; mobile: text-only at reduced opacity */}
          <MagneticButton
            as="a"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.3}
            className={[
              "w-full justify-center md:w-auto inline-flex items-center gap-2.5 rounded-full",
              "font-sans text-sm font-semibold tracking-wide text-white",
              "transition-[background-color,border-color,opacity] duration-200 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2",
              "px-7 py-3.5 sm:px-9 sm:py-4",
              /* mobile: no border, no bg, reduced opacity */
              "border-0 bg-transparent opacity-70",
              /* desktop: full outline treatment */
              "md:border md:border-white/35 md:bg-transparent md:opacity-100 md:hover:bg-white/10 md:hover:border-white/60",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
