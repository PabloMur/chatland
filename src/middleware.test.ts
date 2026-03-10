import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("jose", () => ({
  jwtVerify: vi.fn(),
}));

import { middleware } from "@/middleware";
import { jwtVerify } from "jose";

// Helper: simulate a NextRequest-like object
function makeReq(pathname: string, tokenValue?: string) {
  return {
    nextUrl: { pathname },
    url: `http://localhost${pathname}`,
    cookies: {
      get: (name: string) =>
        name === "chatland-token" && tokenValue ? { value: tokenValue } : undefined,
    },
  } as any;
}

describe("middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SECRET_KEY = "test-secret";
  });

  // ── Protected routes (no token) ───────────────────────────────────────────
  it("redirects unauthenticated user from /home to /login", async () => {
    const res = await middleware(makeReq("/home"));
    expect(res.headers.get("location")).toContain("/login");
  });

  it("redirects unauthenticated user from /my-rooms to /login", async () => {
    const res = await middleware(makeReq("/my-rooms"));
    expect(res.headers.get("location")).toContain("/login");
  });

  it("redirects unauthenticated user from /profile to /login", async () => {
    const res = await middleware(makeReq("/profile"));
    expect(res.headers.get("location")).toContain("/login");
  });

  it("redirects unauthenticated user from /room/abc to /login", async () => {
    const res = await middleware(makeReq("/room/abc123"));
    expect(res.headers.get("location")).toContain("/login");
  });

  // ── Protected routes (valid token) ────────────────────────────────────────
  it("allows authenticated user to access /home", async () => {
    (jwtVerify as any).mockResolvedValue({ payload: { email: "u@t.com" } });
    const res = await middleware(makeReq("/home", "valid-token"));
    expect(res.headers.get("location")).toBeNull();
  });

  it("allows authenticated user to access /my-rooms", async () => {
    (jwtVerify as any).mockResolvedValue({ payload: { email: "u@t.com" } });
    const res = await middleware(makeReq("/my-rooms", "valid-token"));
    expect(res.headers.get("location")).toBeNull();
  });

  // ── Protected route (expired/invalid token) ───────────────────────────────
  it("redirects and clears cookie when token is expired on protected route", async () => {
    (jwtVerify as any).mockRejectedValue(new Error("Token expired"));
    const res = await middleware(makeReq("/home", "expired-token"));
    expect(res.headers.get("location")).toContain("/login");
    const setCookie = res.headers.get("set-cookie");
    expect(setCookie).toContain("chatland-token=");
    expect(setCookie?.toLowerCase()).toContain("max-age=0");
  });

  // ── Public routes (no token) ──────────────────────────────────────────────
  it("allows unauthenticated user to access /login", async () => {
    const res = await middleware(makeReq("/login"));
    expect(res.headers.get("location")).toBeNull();
  });

  it("allows unauthenticated user to access /signup", async () => {
    const res = await middleware(makeReq("/signup"));
    expect(res.headers.get("location")).toBeNull();
  });

  it("allows unauthenticated user to access /forgot-password", async () => {
    const res = await middleware(makeReq("/forgot-password"));
    expect(res.headers.get("location")).toBeNull();
  });

  it("allows unauthenticated user to access /reset-password", async () => {
    const res = await middleware(makeReq("/reset-password"));
    expect(res.headers.get("location")).toBeNull();
  });

  // ── Authenticated user on public routes ───────────────────────────────────
  it("redirects authenticated user from /login to /home", async () => {
    (jwtVerify as any).mockResolvedValue({ payload: { email: "u@t.com" } });
    const res = await middleware(makeReq("/login", "valid-token"));
    expect(res.headers.get("location")).toContain("/home");
  });

  it("redirects authenticated user from /signup to /home", async () => {
    (jwtVerify as any).mockResolvedValue({ payload: { email: "u@t.com" } });
    const res = await middleware(makeReq("/signup", "valid-token"));
    expect(res.headers.get("location")).toContain("/home");
  });

  it("redirects authenticated user from /forgot-password to /home", async () => {
    (jwtVerify as any).mockResolvedValue({ payload: { email: "u@t.com" } });
    const res = await middleware(makeReq("/forgot-password", "valid-token"));
    // /forgot-password is a public route — authenticated users get sent to /home
    expect(res.headers.get("location")).toContain("/home");
  });

  // ── Root "/" ──────────────────────────────────────────────────────────────
  it("does not redirect from / even with a valid token", async () => {
    (jwtVerify as any).mockResolvedValue({ payload: { email: "u@t.com" } });
    const res = await middleware(makeReq("/", "valid-token"));
    expect(res.headers.get("location")).toBeNull();
  });
});
