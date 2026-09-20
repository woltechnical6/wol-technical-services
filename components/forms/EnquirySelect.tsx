"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, ClipboardList, HardHat, HelpCircle, MessageSquare } from "lucide-react";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import type { ServiceIconKey } from "@/content/types";

/**
 * Enquiry-type picker for the contact form: a white rounded panel of rows,
 * each with an outlined circle icon, a bold label and a one-line description,
 * with a soft blue highlight gliding between rows. The chosen value is
 * mirrored into a hidden native <select name="service" required>, so the
 * server action and the native required-field validation keep working.
 */
export type EnquiryOption = {
  value: string;
  label: string;
  description: string;
  icon: ServiceIconKey | "general" | "quotation" | "site-support" | "other";
};

export const INQUIRY_OPTIONS: EnquiryOption[] = [
  { value: "general", label: "General enquiry", description: "A question, an introduction or anything not listed below.", icon: "general" },
  { value: "quotation", label: "Request a quotation", description: "Send us a scope and we return a priced proposal.", icon: "quotation" },
  { value: "mechanical", label: "Mechanical", description: "Rotating and static equipment, installation and overhaul.", icon: "mechanical" },
  { value: "piping", label: "Piping", description: "Spools, supports, tie-ins and pressure testing.", icon: "piping" },
  { value: "welding", label: "Welding", description: "Coded structural and pressure welding.", icon: "welding" },
  { value: "electrical-instrumentation", label: "Electrical & Instrumentation", description: "Cabling, terminations, instruments and loop checks.", icon: "electrical" },
  { value: "automation", label: "Automation & Control Systems", description: "PLC, DCS, SCADA and system integration.", icon: "automation" },
  { value: "site-support", label: "Site technical support", description: "Supervised crews and technical manpower on site.", icon: "site-support" },
  { value: "other", label: "Other", description: "Tell us in the message and we will route it.", icon: "other" },
];

const LUCIDE_ICON = { general: MessageSquare, quotation: ClipboardList, "site-support": HardHat, other: HelpCircle } as const;

function OptionIcon({ icon, className }: { icon: EnquiryOption["icon"]; className?: string }) {
  if (icon in LUCIDE_ICON) {
    const Icon = LUCIDE_ICON[icon as keyof typeof LUCIDE_ICON];
    return <Icon className={cn("size-4", className)} strokeWidth={1.75} aria-hidden />;
  }
  return <ServiceIcon name={icon as ServiceIconKey} className={cn("size-5", className)} />;
}

const SPRING = { type: "spring", stiffness: 500, damping: 38 } as const;

type Props = {
  id: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
};

export function EnquirySelect({ id, name, defaultValue, placeholder = "Select an enquiry type..." }: Props) {
  const reduce = useReducedMotion();
  const listId = useId();
  const initial = INQUIRY_OPTIONS.some((o) => o.value === defaultValue) ? (defaultValue as string) : "";
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(() => Math.max(0, INQUIRY_OPTIONS.findIndex((o) => o.value === initial)));

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selected = INQUIRY_OPTIONS.find((o) => o.value === value);
  const selectedIdx = Math.max(0, INQUIRY_OPTIONS.findIndex((o) => o.value === value));

  // Outside click / tap closes the panel.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  // Focus the list when it opens; keep the active row in view while arrowing.
  useEffect(() => {
    if (open) listRef.current?.focus({ preventScroll: true });
  }, [open]);
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, activeIdx]);

  const openAt = (idx: number) => {
    setActiveIdx(idx);
    setOpen(true);
  };
  const choose = (idx: number) => {
    setValue(INQUIRY_OPTIONS[idx].value);
    setActiveIdx(idx);
    setOpen(false);
    buttonRef.current?.focus();
  };
  const move = (delta: number) => setActiveIdx((i) => (i + delta + INQUIRY_OPTIONS.length) % INQUIRY_OPTIONS.length);

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openAt(selectedIdx);
    }
  };
  const onListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        move(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        move(-1);
        break;
      case "Home":
        e.preventDefault();
        setActiveIdx(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIdx(INQUIRY_OPTIONS.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(activeIdx);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      {/* Hidden mirror keeps the form contract: name="service", required, native validation bubble. */}
      <select
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {INQUIRY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? setOpen(false) : openAt(selectedIdx))}
        onKeyDown={onButtonKeyDown}
        className={cn(
          "group relative flex w-full items-center gap-3 rounded-full border bg-white py-2 pl-2 pr-3 text-left text-sm transition-[border-color,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20",
          open ? "border-blue-400 shadow-[0_12px_32px_-18px_rgba(29,78,216,0.4)]" : "border-line hover:border-blue-200",
        )}
      >
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full border bg-white transition-colors duration-300",
            selected ? "border-blue-200 text-blue-600" : "border-line text-ink-400",
          )}
        >
          {selected ? <OptionIcon icon={selected.icon} /> : <MessageSquare className="size-4" strokeWidth={1.75} aria-hidden />}
        </span>
        <span className="min-w-0 flex-1">
          {selected ? (
            <>
              <span className="block truncate font-semibold text-ink-900">{selected.label}</span>
              <span className="block truncate text-xs text-ink-500">{selected.description}</span>
            </>
          ) : (
            <span className="block text-ink-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-ink-400 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-blue-600",
            open && "rotate-180 text-blue-600",
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="absolute inset-x-0 top-full z-30 mt-2 origin-top"
          >
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={id}
              aria-activedescendant={`${listId}-${activeIdx}`}
              tabIndex={-1}
              onKeyDown={onListKeyDown}
              className="max-h-[min(60vh,28rem)] overflow-y-auto rounded-2xl border border-blue-100/70 bg-white p-2 shadow-[0_28px_70px_-24px_rgba(30,64,175,0.35)] outline-none"
            >
              {INQUIRY_OPTIONS.map((o, i) => {
                const active = i === activeIdx;
                const isSelected = o.value === value;
                return (
                  <li key={o.value} role="none" className="relative">
                    {active && (
                      <motion.span
                        layoutId={`${listId}-pill`}
                        transition={SPRING}
                        className="absolute inset-0 z-0 rounded-xl bg-blue-50/80"
                      />
                    )}
                    <div
                      id={`${listId}-${i}`}
                      data-idx={i}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => choose(i)}
                      className="relative z-10 flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2"
                    >
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                          active || isSelected ? "border-blue-200 bg-white text-blue-600" : "border-line bg-white text-ink-700",
                        )}
                      >
                        <OptionIcon icon={o.icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-ink-900">{o.label}</span>
                        <span className="block text-xs text-ink-500">{o.description}</span>
                      </span>
                      <Check
                        className={cn("size-4 shrink-0 text-blue-600 transition-opacity duration-200", isSelected ? "opacity-100" : "opacity-0")}
                        strokeWidth={2.25}
                        aria-hidden
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
