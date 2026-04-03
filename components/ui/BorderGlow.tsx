"use client";

import { useRef, useCallback, ReactNode } from "react";

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: number;
}

export default function BorderGlow({
  children,
  className = "",
  glowColor = "#6366f1",
  borderRadius = 16,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.sqrt(cx * cx + cy * cy);
    const proximity = distance / maxDist;

    const intensity = Math.pow(proximity, 1.5);
    card.style.boxShadow = `
      0 0 ${10 + intensity * 20}px ${glowColor}55,
      0 0 ${20 + intensity * 40}px ${glowColor}33,
      inset 0 0 ${10 + intensity * 15}px ${glowColor}22
    `;
    card.style.borderColor = `${glowColor}${Math.floor(55 + intensity * 150).toString(16)}`;
  }, [glowColor]);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.boxShadow = "";
    card.style.borderColor = "";
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={{
        borderRadius: `${borderRadius}px`,
        border: "1px solid transparent",
        transition: "box-shadow 0.15s ease, border-color 0.15s ease",
      }}
    >
      {children}
    </div>
  );
}