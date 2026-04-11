import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().max(160).optional().or(z.literal("")),
  budget: z.string().max(80).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 }
      );
    }

    // Normalise empty strings from the form into null for optional DB columns
    const { name, email, message } = parsed.data;
    const company = parsed.data.company?.trim() || null;
    const budget = parsed.data.budget?.trim() || null;

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company,
        budget,
        message,
      },
      select: { id: true, createdAt: true },
    });

    // Future extension points (no need to block the response on these):
    //   - forward to Twenty CRM as a Person + Opportunity
    //   - send an email notification via Resend
    //   - post to a Slack webhook
    console.log(
      `[contact] new lead ${submission.id} from ${email} at ${submission.createdAt.toISOString()}`
    );

    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err) {
    console.error("[contact] failed to persist submission", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
