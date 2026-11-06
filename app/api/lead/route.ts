import { submitLead, type LeadPayload } from "@/lib/submit-lead";

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const result = await submitLead(request, body);

  if (!result.ok) {
    return Response.json(
      { error: result.error, message: "message" in result ? result.message : undefined },
      { status: result.status },
    );
  }

  return Response.json({
    success: true,
    whatsappUrl: "whatsappUrl" in result ? result.whatsappUrl : undefined,
    phoneTel: "phoneTel" in result ? result.phoneTel : undefined,
  });
}
