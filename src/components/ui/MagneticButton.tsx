"use client";

import React, { useRef, useCallback, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as: Tag = "button",
  href,
  target,
  rel,
  onClick,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const [isTouch, setIsTouch] = React.useState(false);
  React.useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const x = useSpring(0, { stiffness: 160, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 160, damping: 18, mass: 0.6 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const props: Record<string, unknown> = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    className,
    style,
    ...(href ? { href, target, rel } : {}),
  };

  const El = Tag as React.ElementType;

  if (isTouch) {
    return <El {...props}>{children}</El>;
  }

  return (
    <motion.div style={{ x, y, display: "inline-block" }}>
      <El {...props}>{children}</El>
    </motion.div>
  );
}
