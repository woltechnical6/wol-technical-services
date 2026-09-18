import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact endpoint. Validates the payload and (for now) logs it server-side.
 * Wire this to an email/CRM provider by replacing `deliver()` — the client
 * contract stays the same.
 */
async function deliver(data: Record<string, unknown>) {
  // Placeholder delivery: no external provider configured yet.
  console.info("[contact] enquiry received", { ...data, receivedAt: new Date().toISOString() });
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message }));
    return NextResponse.json({ ok: false, error: "Validation failed.", issues }, { status: 422 });
  }

  // Honeypot filled → pretend success, drop silently.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website: _hp, ...data } = parsed.data;
  void _hp;
  await deliver(data);

  return NextResponse.json({ ok: true });
}
