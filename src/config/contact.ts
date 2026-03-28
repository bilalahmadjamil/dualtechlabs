/**
 * Contact configuration — values come only from NEXT_PUBLIC_* env vars (see .env.example).
 *
 * Each variable must be read as `process.env.NEXT_PUBLIC_*` directly (not via a dynamic key).
 * Otherwise Next.js cannot inline them in the browser bundle and they are undefined at runtime.
 */

function requiredNonEmpty(
  value: string | undefined,
  name: string
): string {
  if (value == null || String(value).trim() === "") {
    throw new Error(
      `[contact] Missing required environment variable: ${name}. Set it in .env.local or your deployment environment.`
    );
  }
  return String(value).trim();
}

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

export const contactEmail = requiredNonEmpty(
  process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  "NEXT_PUBLIC_CONTACT_EMAIL"
);

const rawPhone = requiredNonEmpty(
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE,
  "NEXT_PUBLIC_WHATSAPP_PHONE"
);
export const whatsappPhoneDigits = digitsOnly(rawPhone);

if (!whatsappPhoneDigits) {
  throw new Error(
    "[contact] NEXT_PUBLIC_WHATSAPP_PHONE must contain a valid phone number (digits)."
  );
}

export const whatsappPrefillMessage = requiredNonEmpty(
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE,
  "NEXT_PUBLIC_WHATSAPP_MESSAGE"
);

export function getWhatsAppUrl(): string {
  const text = encodeURIComponent(whatsappPrefillMessage);
  return `https://wa.me/${whatsappPhoneDigits}?text=${text}`;
}

export function getMailtoUrl(subject?: string): string {
  const q = subject
    ? `?subject=${encodeURIComponent(subject)}`
    : "";
  return `mailto:${contactEmail}${q}`;
}

/** E.164 `tel:` for the configured number (same digits as WhatsApp). */
export function getTelUrl(): string {
  return `tel:+${whatsappPhoneDigits}`;
}

/** Human-readable phone for UI (PK +92 mobile style when possible). */
export function formatPhoneDisplay(digits: string): string {
  if (!digits) return "";
  if (digits.startsWith("92") && digits.length >= 12) {
    const rest = digits.slice(2);
    return `+92 ${rest.slice(0, 3)} ${rest.slice(3)}`;
  }
  return `+${digits}`;
}
