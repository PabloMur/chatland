import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/auth/logout/route";

describe("POST /api/auth/logout", () => {
  it("returns 200 with ok:true", async () => {
    const res = await POST();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it("clears the chatland-token cookie (Max-Age=0)", async () => {
    const res = await POST();
    const setCookie = res.headers.get("set-cookie");
    expect(setCookie).toContain("chatland-token=");
    expect(setCookie?.toLowerCase()).toContain("max-age=0");
  });

  it("sets HttpOnly on the cleared cookie", async () => {
    const res = await POST();
    const setCookie = res.headers.get("set-cookie");
    expect(setCookie?.toLowerCase()).toContain("httponly");
  });
});
