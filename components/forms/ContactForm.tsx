"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { services } from "@/content/services";
import { contactPage } from "@/content/pages";
import { TechLabel } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border border-line bg-graphite-900/60 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 outline-none transition-colors focus:border-cyan-400/70 focus-visible:ring-1 focus-visible:ring-cyan-400/40 aria-[invalid=true]:border-amber-500/70";
const label = "tech-label block text-ink-500";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { enquiryType: contactPage.enquiryTypes[0], service: defaultService ?? "", website: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(values) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative" aria-describedby="form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name?.message}>
          <input id="name" autoComplete="name" className={field} placeholder="Your full name" aria-invalid={!!errors.name} {...register("name")} />
        </Field>
        <Field id="company" label="Company" error={errors.company?.message}>
          <input id="company" autoComplete="organization" className={field} placeholder="Company or facility" {...register("company")} />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" className={field} placeholder="name@company.com" aria-invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone?.message}>
          <input id="phone" type="tel" autoComplete="tel" className={field} placeholder="+971 …" aria-invalid={!!errors.phone} {...register("phone")} />
        </Field>
        <Field id="enquiryType" label="Enquiry type" error={errors.enquiryType?.message}>
          <select id="enquiryType" className={cn(field, "appearance-none")} aria-invalid={!!errors.enquiryType} {...register("enquiryType")}>
            {contactPage.enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="service" label="Service (optional)" error={errors.service?.message}>
          <select id="service" className={cn(field, "appearance-none")} {...register("service")}>
            <option value="">Not sure / multiple</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.index} · {s.title}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="message" label="Scope description" error={errors.message?.message}>
            <textarea id="message" rows={6} className={cn(field, "resize-y")} placeholder="Equipment, drawings, site, timing, access or permit requirements…" aria-invalid={!!errors.message} {...register("message")} />
          </Field>
        </div>
        {/* Honeypot */}
        <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex items-center gap-3 bg-blue-500 px-6 py-3.5 font-display text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-blue-400 disabled:cursor-wait disabled:opacity-70 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
        </button>
        <p className="text-xs text-ink-500">By sending, you agree to our privacy policy. No marketing lists.</p>
      </div>

      <div id="form-status" aria-live="polite" className="mt-6 min-h-6">
        <AnimatePresence mode="wait">
          {status === "sent" && (
            <motion.div key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE_OUT_EXPO }} className="flex items-start gap-3 border border-cyan-400/40 bg-cyan-400/5 p-4">
              <Check className="mt-0.5 size-4 text-cyan-400" strokeWidth={2} />
              <div>
                <TechLabel tone="cyan" tick={false}>
                  Enquiry received
                </TechLabel>
                <p className="mt-1 text-sm text-ink-700">Thank you. We will review the scope and respond during business hours.</p>
              </div>
            </motion.div>
          )}
          {status === "error" && (
            <motion.p key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border border-amber-500/40 bg-amber-500/5 p-4 text-sm text-ink-700">
              Something went wrong sending the form. Please try again or use the contact details on this page.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({ id, label: text, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
      </label>
      <div className="mt-2">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-error`} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-amber-500">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
