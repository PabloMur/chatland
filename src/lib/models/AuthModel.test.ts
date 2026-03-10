import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/FirestoreConn", () => ({
  firestoreDB: { collection: vi.fn() },
}));

vi.mock("bcrypt", () => ({
  default: { hash: vi.fn(), compare: vi.fn() },
}));

vi.mock("jsonwebtoken", () => ({
  default: { sign: vi.fn(), verify: vi.fn() },
}));

import AuthModel from "@/lib/models/AuthModel";
import { firestoreDB } from "@/lib/FirestoreConn";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("AuthModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SECRET_KEY = "test-secret";
  });

  // ── createAuth ────────────────────────────────────────────────────────────
  describe("createAuth", () => {
    it("hashes the password and saves doc to Firestore", async () => {
      const mockSet = vi.fn().mockResolvedValue(undefined);
      const mockDoc = vi.fn().mockReturnValue({ set: mockSet });
      (firestoreDB.collection as any).mockReturnValue({ doc: mockDoc });
      (bcrypt.hash as any).mockResolvedValue("hashed_pw");

      const result = await AuthModel.createAuth("user@test.com", "pass123");

      expect(bcrypt.hash).toHaveBeenCalledWith("pass123", 10);
      expect(mockSet).toHaveBeenCalledWith({ email: "user@test.com", password: "hashed_pw" });
      expect(result).toBe(true);
    });
  });

  // ── deleteAuth ────────────────────────────────────────────────────────────
  describe("deleteAuth", () => {
    it("deletes the auth doc and returns true when email exists", async () => {
      const mockDelete = vi.fn().mockResolvedValue(undefined);
      const mockGet = vi.fn().mockResolvedValue({
        empty: false,
        docs: [{ ref: { delete: mockDelete } }],
      });
      const mockWhere = vi.fn().mockReturnValue({ get: mockGet });
      (firestoreDB.collection as any).mockReturnValue({ where: mockWhere });

      const result = await AuthModel.deleteAuth("user@test.com");

      expect(mockDelete).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it("returns false when email does not exist", async () => {
      const mockGet = vi.fn().mockResolvedValue({ empty: true });
      const mockWhere = vi.fn().mockReturnValue({ get: mockGet });
      (firestoreDB.collection as any).mockReturnValue({ where: mockWhere });

      const result = await AuthModel.deleteAuth("notfound@test.com");

      expect(result).toBe(false);
    });

    it("returns false on Firestore error", async () => {
      const mockWhere = vi.fn().mockReturnValue({
        get: vi.fn().mockRejectedValue(new Error("DB error")),
      });
      (firestoreDB.collection as any).mockReturnValue({ where: mockWhere });

      const result = await AuthModel.deleteAuth("user@test.com");

      expect(result).toBe(false);
    });
  });

  // ── creatToken ────────────────────────────────────────────────────────────
  describe("creatToken", () => {
    it("returns a signed JWT when credentials are correct", async () => {
      const mockGet = vi.fn().mockResolvedValue({
        empty: false,
        docs: [{ data: () => ({ password: "hashed_pw" }) }],
      });
      const mockWhere = vi.fn().mockReturnValue({ get: mockGet });
      (firestoreDB.collection as any).mockReturnValue({ where: mockWhere });
      (bcrypt.compare as any).mockResolvedValue(true);
      (jwt.sign as any).mockReturnValue("signed-token");

      const result = await AuthModel.creatToken("user@test.com", "pass123");

      expect(bcrypt.compare).toHaveBeenCalledWith("pass123", "hashed_pw");
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: "user@test.com" },
        "test-secret",
        { expiresIn: "7d" }
      );
      expect(result).toBe("signed-token");
    });

    it("returns error object when email is not found", async () => {
      const mockGet = vi.fn().mockResolvedValue({ empty: true });
      const mockWhere = vi.fn().mockReturnValue({ get: mockGet });
      (firestoreDB.collection as any).mockReturnValue({ where: mockWhere });

      const result = await AuthModel.creatToken("ghost@test.com", "pass");

      expect(result).toEqual({ error: "Invalid email or password" });
    });

    it("returns error object when password is wrong", async () => {
      const mockGet = vi.fn().mockResolvedValue({
        empty: false,
        docs: [{ data: () => ({ password: "hashed_pw" }) }],
      });
      const mockWhere = vi.fn().mockReturnValue({ get: mockGet });
      (firestoreDB.collection as any).mockReturnValue({ where: mockWhere });
      (bcrypt.compare as any).mockResolvedValue(false);

      const result = await AuthModel.creatToken("user@test.com", "wrongpass");

      expect(result).toEqual({ error: "Invalid email or password" });
    });

    it("returns error object on unexpected exception", async () => {
      const mockWhere = vi.fn().mockReturnValue({
        get: vi.fn().mockRejectedValue(new Error("DB timeout")),
      });
      (firestoreDB.collection as any).mockReturnValue({ where: mockWhere });

      const result = await AuthModel.creatToken("user@test.com", "pass");

      expect(result).toMatchObject({ error: expect.any(String) });
    });
  });
});
