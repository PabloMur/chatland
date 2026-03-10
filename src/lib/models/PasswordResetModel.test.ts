import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/FirestoreConn", () => ({
  firestoreDB: { collection: vi.fn() },
}));

vi.mock("crypto", () => ({
  default: { randomBytes: vi.fn() },
  randomBytes: vi.fn(),
}));

vi.mock("firebase-admin", () => ({
  default: {
    firestore: {
      Timestamp: {
        fromDate: vi.fn((d: Date) => ({ toDate: () => d })),
      },
    },
  },
}));

vi.mock("bcrypt", () => ({
  default: { hash: vi.fn().mockResolvedValue("new_hashed_pw") },
}));

import PasswordResetModel from "@/lib/models/PasswordResetModel";
import { firestoreDB } from "@/lib/FirestoreConn";
import crypto from "crypto";

// Helper: builds a mock Firestore collection chain
function mockCollection(name: string, impl: Record<string, any>) {
  (firestoreDB.collection as any).mockImplementation((n: string) =>
    n === name ? impl : {}
  );
}

describe("PasswordResetModel", () => {
  beforeEach(() => vi.clearAllMocks());

  // ── createResetToken ───────────────────────────────────────────────────────
  describe("createResetToken", () => {
    it("returns null when user does not exist in Firestore", async () => {
      (firestoreDB.collection as any).mockImplementation((n: string) => {
        if (n === "users") {
          return { where: vi.fn().mockReturnValue({ get: vi.fn().mockResolvedValue({ empty: true }) }) };
        }
        return {};
      });

      const result = await PasswordResetModel.createResetToken("unknown@test.com");
      expect(result).toBeNull();
    });

    it("creates token and returns it when user exists", async () => {
      (crypto.randomBytes as any).mockReturnValue({ toString: () => "abc123token" });

      (firestoreDB.collection as any).mockImplementation((n: string) => {
        if (n === "users") {
          return {
            where: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({ empty: false, docs: [{}] }),
            }),
          };
        }
        if (n === "password_resets") {
          const whereChain = {
            where: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({ docs: [] }),
            }),
          };
          return {
            where: vi.fn().mockReturnValue(whereChain),
            add: vi.fn().mockResolvedValue({}),
          };
        }
        return {};
      });

      const result = await PasswordResetModel.createResetToken("user@test.com");
      expect(result).toBe("abc123token");
    });

    it("invalidates existing tokens before creating a new one", async () => {
      (crypto.randomBytes as any).mockReturnValue({ toString: () => "newtoken" });
      const mockUpdate = vi.fn().mockResolvedValue(undefined);

      (firestoreDB.collection as any).mockImplementation((n: string) => {
        if (n === "users") {
          return {
            where: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({ empty: false, docs: [{}] }),
            }),
          };
        }
        if (n === "password_resets") {
          const existingDoc = { ref: { update: mockUpdate } };
          const whereChain = {
            where: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({ docs: [existingDoc] }),
            }),
          };
          return {
            where: vi.fn().mockReturnValue(whereChain),
            add: vi.fn().mockResolvedValue({}),
          };
        }
        return {};
      });

      await PasswordResetModel.createResetToken("user@test.com");
      expect(mockUpdate).toHaveBeenCalledWith({ used: true });
    });
  });

  // ── resetPassword ─────────────────────────────────────────────────────────
  describe("resetPassword", () => {
    it("returns error when token is invalid or already used", async () => {
      (firestoreDB.collection as any).mockImplementation(() => ({
        where: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            get: vi.fn().mockResolvedValue({ empty: true }),
          }),
        }),
      }));

      const result = await PasswordResetModel.resetPassword("badtoken", "newpass");
      expect(result).toEqual({ error: "Token inválido o ya utilizado" });
    });

    it("returns error and marks token used when it has expired", async () => {
      const pastDate = new Date(Date.now() - 10_000);
      const mockUpdate = vi.fn().mockResolvedValue(undefined);

      (firestoreDB.collection as any).mockImplementation(() => ({
        where: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            get: vi.fn().mockResolvedValue({
              empty: false,
              docs: [
                {
                  data: () => ({ email: "u@t.com", expiresAt: { toDate: () => pastDate } }),
                  ref: { update: mockUpdate },
                },
              ],
            }),
          }),
        }),
      }));

      const result = await PasswordResetModel.resetPassword("expired", "newpass");

      expect(result).toEqual({ error: "El link expiró. Solicitá uno nuevo." });
      expect(mockUpdate).toHaveBeenCalledWith({ used: true });
    });

    it("updates the password and marks token as used on success", async () => {
      const futureDate = new Date(Date.now() + 3_600_000);
      const resetUpdate = vi.fn().mockResolvedValue(undefined);
      const authUpdate = vi.fn().mockResolvedValue(undefined);

      (firestoreDB.collection as any).mockImplementation((n: string) => {
        if (n === "password_resets") {
          return {
            where: vi.fn().mockReturnValue({
              where: vi.fn().mockReturnValue({
                get: vi.fn().mockResolvedValue({
                  empty: false,
                  docs: [
                    {
                      data: () => ({
                        email: "u@t.com",
                        expiresAt: { toDate: () => futureDate },
                      }),
                      ref: { update: resetUpdate },
                    },
                  ],
                }),
              }),
            }),
          };
        }
        if (n === "auth") {
          return {
            where: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({
                empty: false,
                docs: [{ ref: { update: authUpdate } }],
              }),
            }),
          };
        }
        return {};
      });

      const result = await PasswordResetModel.resetPassword("validtoken", "newpass123");

      expect(result).toEqual({ ok: true });
      expect(authUpdate).toHaveBeenCalled();
      expect(resetUpdate).toHaveBeenCalledWith({ used: true });
    });

    it("returns error when auth record is not found", async () => {
      const futureDate = new Date(Date.now() + 3_600_000);

      (firestoreDB.collection as any).mockImplementation((n: string) => {
        if (n === "password_resets") {
          return {
            where: vi.fn().mockReturnValue({
              where: vi.fn().mockReturnValue({
                get: vi.fn().mockResolvedValue({
                  empty: false,
                  docs: [
                    {
                      data: () => ({
                        email: "u@t.com",
                        expiresAt: { toDate: () => futureDate },
                      }),
                      ref: { update: vi.fn() },
                    },
                  ],
                }),
              }),
            }),
          };
        }
        if (n === "auth") {
          return {
            where: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({ empty: true }),
            }),
          };
        }
        return {};
      });

      const result = await PasswordResetModel.resetPassword("token", "pass123");
      expect(result).toEqual({ error: "Usuario no encontrado" });
    });
  });
});
