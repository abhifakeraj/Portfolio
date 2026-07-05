'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Wraps card content with a subtle 3D tilt that follows the cursor,
 * plus a radial glow at the pointer position. Purely a visual affordance —
 * degrades gracefully (no tilt) on touch devices since there's no mousemove.
 */
export function TiltCard({ children, className, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(300px circle at ${glowX}% ${glowY}%, hsl(var(--accent) / 0.12), transparent 70%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
      rotateX,
      rotateY,
      transformPerspective: 800,
  }}
      className={cn('card-surface relative overflow-hidden', className)}
    >
      <motion.div
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}
