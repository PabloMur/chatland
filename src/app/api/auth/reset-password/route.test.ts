import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/models/PasswordResetModel", () => ({
  default: { resetPassword: vi.fn() },
}));

import { POST } from "@/app/api/auth/reset-password/route";
import PasswordResetModel from "@/lib/models/PasswordResetModel";

function makeRequest(body: object) {
  return new Request("http://localhost/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/auth/reset-password", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when token is missing", async () => {
    const res = await POST(makeRequest({ newPassword: "abc123" }) as any);
    expect(res.status).toBe(400);
  });

  it("returns 400 when newPassword is missing", async () => {
    const res = await POST(makeRequest({ token: "tok" }) as any);
    expect(res.status).toBe(400);
  });

  it("returns 400 when password is shorter than 6 characters", async () => {
    const res = await POST(makeRequest({ token: "tok", newPassword: "abc" }) as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/6/);
  });

  it("returns 400 with model error when token is invalid", async () => {
    (PasswordResetModel.resetPassword as any).mockResolvedValue({
      error: "Token inválido o ya utilizado",
    });
    const res = await POST(makeRequest({ token: "bad", newPassword: "newpass123" }) as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Token inválido o ya utilizado");
  });

  it("returns 400 with model error when token is expired", async () => {
    (PasswordResetModel.resetPassword as any).mockResolvedValue({
      error: "El link expiró. Solicitá uno nuevo.",
    });
    const res = await POST(makeRequest({ token: "expired", newPassword: "newpass123" }) as any);
    expect(res.status).toBe(400);
  });

  it("returns 200 ok:true on successful password reset", async () => {
    (PasswordResetModel.resetPassword as any).mockResolvedValue({ ok: true });
    const res = await POST(makeRequest({ token: "valid", newPassword: "newpass123" }) as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it("returns 500 on unexpected error", async () => {
    (PasswordResetModel.resetPassword as any).mockRejectedValue(new Error("DB error"));
    const res = await POST(makeRequest({ token: "tok", newPassword: "newpass123" }) as any);
    expect(res.status).toBe(500);
  });
});
