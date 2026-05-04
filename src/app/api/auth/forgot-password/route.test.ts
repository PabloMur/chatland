import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/models/PasswordResetModel", () => ({
  default: { createResetToken: vi.fn() },
}));

vi.mock("@sendgrid/mail", () => ({
  default: { setApiKey: vi.fn(), send: vi.fn() },
}));

import { POST } from "@/app/api/auth/forgot-password/route";
import PasswordResetModel from "@/lib/models/PasswordResetModel";
import sgMail from "@sendgrid/mail";

function makeRequest(body: object) {
  return new Request("http://localhost/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/auth/forgot-password", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({}) as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeTruthy();
  });

  it("returns ok:true without sending email when user does not exist (anti-enumeration)", async () => {
    (PasswordResetModel.createResetToken as any).mockResolvedValue(null);
    const res = await POST(makeRequest({ email: "nobody@test.com" }) as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(sgMail.send).not.toHaveBeenCalled();
  });

  it("sends email and returns ok:true when user exists", async () => {
    (PasswordResetModel.createResetToken as any).mockResolvedValue("reset-tok-123");
    (sgMail.send as any).mockResolvedValue([{ statusCode: 202 }]);

    const res = await POST(makeRequest({ email: "user@test.com" }) as any);

    expect(res.status).toBe(200);
    expect(sgMail.send).toHaveBeenCalledOnce();

    const sendArg = (sgMail.send as any).mock.calls[0][0];
    expect(sendArg.to).toBe("user@test.com");
    expect(sendArg.html).toContain("reset-tok-123");
  });

  it("email contains link to /reset-password", async () => {
    (PasswordResetModel.createResetToken as any).mockResolvedValue("mytoken");
    (sgMail.send as any).mockResolvedValue([{}]);

    await POST(makeRequest({ email: "user@test.com" }) as any);

    const sendArg = (sgMail.send as any).mock.calls[0][0];
    expect(sendArg.html).toContain("/reset-password?token=mytoken");
  });

  it("returns 500 when SendGrid throws", async () => {
    (PasswordResetModel.createResetToken as any).mockResolvedValue("tok");
    (sgMail.send as any).mockRejectedValue(new Error("SendGrid error"));

    const res = await POST(makeRequest({ email: "user@test.com" }) as any);
    expect(res.status).toBe(500);
  });
});
