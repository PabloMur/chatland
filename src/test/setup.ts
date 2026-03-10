import { vi } from "vitest";

// Set required env vars for tests
process.env.SECRET_KEY = "test-secret-key";
process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
process.env.SENDGRID_API_KEY = "SG.test";
process.env.SENDGRID_FROM_EMAIL = "test@test.com";
process.env.NODE_ENV = "test";

// Mock next/headers globally
vi.mock("next/headers", () => ({
  headers: vi.fn(() =>
    Promise.resolve({
      get: vi.fn(() => null),
    })
  ),
  cookies: vi.fn(() =>
    Promise.resolve({
      get: vi.fn(() => null),
    })
  ),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
  useSearchParams: vi.fn(() => ({ get: vi.fn() })),
}));
