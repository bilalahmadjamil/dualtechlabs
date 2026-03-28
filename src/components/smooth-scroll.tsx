import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Wrapper kept for stable layout structure. Scrolling is fully native — no Lenis
 * or other smooth-scroll libraries (they queue input behind rAF and add lag).
 */
export default function SmoothScroll({ children }: Props) {
  return <>{children}</>;
}
