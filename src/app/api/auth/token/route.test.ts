import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/controllers/authController", () => ({
  default: { retriveToken: vi.fn() },
}));

import { POST } from "@/app/api/auth/token/route";
import AuthController from "@/lib/controllers/authController";

function makeRequest(body: object) {
  return new Request("http://localhost/api/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/auth/token", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 401 when retriveToken returns null", async () => {
    (AuthController.retriveToken as any).mockResolvedValue(null);
    const res = await POST(makeRequest({ email: "u@t.com", password: "wrong" }) as any);
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Invalid credentials");
  });

  it("returns 401 when retriveToken returns an error object (not a string)", async () => {
    (AuthController.retriveToken as any).mockResolvedValue({ error: "Invalid email or password" });
    const res = await POST(makeRequest({ email: "u@t.com", password: "wrong" }) as any);
    expect(res.status).toBe(401);
  });

  it("returns 200 with token when credentials are valid", async () => {
    (AuthController.retriveToken as any).mockResolvedValue("valid-jwt-token");
    const res = await POST(makeRequest({ email: "u@t.com", password: "correct" }) as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.token).toBe("valid-jwt-token");
  });

  it("sets an HttpOnly cookie on successful login", async () => {
    (AuthController.retriveToken as any).mockResolvedValue("valid-jwt-token");
    const res = await POST(makeRequest({ email: "u@t.com", password: "correct" }) as any);
    const setCookie = res.headers.get("set-cookie");
    expect(setCookie).toContain("chatland-token=valid-jwt-token");
    expect(setCookie?.toLowerCase()).toContain("httponly");
  });

  it("returns 400 on unexpected error", async () => {
    (AuthController.retriveToken as any).mockRejectedValue(new Error("DB down"));
    const res = await POST(makeRequest({ email: "u@t.com", password: "pass" }) as any);
    expect(res.status).toBe(400);
  });
});
