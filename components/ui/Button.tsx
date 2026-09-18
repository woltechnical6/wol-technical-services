"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCanHover } from "@/lib/hooks/useMediaQuery";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  magnetic?: boolean;
  /** Secondary variant sitting on the deep (dark) register. */
  onDeep?: boolean;
};

const base =
  "group relative inline-flex items-center gap-3 overflow-hidden font-display text-sm font-medium tracking-wide uppercase transition-colors duration-300 select-none";

const variants: Record<Variant, string> = {
  primary:
    "btn-primary bg-blue-500 text-white px-6 py-3.5 hover:bg-blue-600 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]",
  secondary: "btn-secondary border border-line-strong text-ink-700 px-6 py-3.5",
  ghost: "text-ink-500 hover:text-ink-900 px-0 py-2",
};

/**
 * Refined button. Primary: magnetic drift toward the pointer, a light sweep
 * on hover and a soft depth shadow. Secondary: hairline outline that fills
 * from the bottom. No bounce, no scale.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  icon = true,
  type = "button",
  onClick,
  magnetic = true,
  onDeep = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.35 });
  const y = useSpring(my, { stiffness: 260, damping: 22, mass: 0.35 });

  const onMove = (e: MouseEvent) => {
    if (!magnetic || !canHover || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.16);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.16);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowUpRight
          className="relative z-10 size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      )}
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-[20deg] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[420%]"
        />
      )}
    </>
  );

  const cls = cn(base, variants[variant], variant === "secondary" && onDeep && "btn-on-deep border-white/30 text-white", className);

  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      {href ? (
        <Link href={href} className={cls} onClick={onClick}>
          {inner}
        </Link>
      ) : (
        <button type={type} className={cls} onClick={onClick}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
