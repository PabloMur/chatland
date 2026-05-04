import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/FirestoreConn", () => ({
  firestoreDB: { collection: vi.fn() },
}));

vi.mock("@/lib/CloudinaryConn", () => ({
  cloudinary: { uploader: { upload: vi.fn() } },
}));

vi.mock("bcryptjs", () => ({
  default: { hash: vi.fn() },
}));

import { UserModel } from "@/lib/models/UserModel";
import { firestoreDB } from "@/lib/FirestoreConn";
import bcrypt from "bcryptjs";

describe("UserModel", () => {
  beforeEach(() => vi.clearAllMocks());

  // ── createMe ───────────────────────────────────────────────────────────────
  describe("createMe", () => {
    it("returns error when user already exists", async () => {
      (firestoreDB.collection as any).mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({ empty: false }),
        }),
      });

      const result = await UserModel.createMe("existing@test.com", "pass");
      expect(result).toEqual({ error: "El usuario ya existe" });
    });

    it("creates user and auth records when email is new", async () => {
      (bcrypt.hash as any).mockResolvedValue("hashed_pw");

      let callCount = 0;
      const mockAuthSet = vi.fn().mockResolvedValue(undefined);
      const mockUserAdd = vi.fn().mockResolvedValue({ id: "uid123" });

      (firestoreDB.collection as any).mockImplementation((name: string) => {
        if (name === "users") {
          callCount++;
          if (callCount === 1) {
            // checkEmail query
            return {
              where: vi.fn().mockReturnValue({
                get: vi.fn().mockResolvedValue({ empty: true }),
              }),
            };
          }
          // add new user
          return { add: mockUserAdd };
        }
        if (name === "auth") {
          return { doc: vi.fn().mockReturnValue({ set: mockAuthSet }) };
        }
        return {};
      });

      const result = await UserModel.createMe("new@test.com", "pass123");

      expect(mockUserAdd).toHaveBeenCalled();
      expect(mockAuthSet).toHaveBeenCalledWith(
        expect.objectContaining({ email: "new@test.com", password: "hashed_pw" })
      );
      expect(result).toMatchObject({ email: "new@test.com", id: "uid123" });
    });
  });

  // ── getMe ──────────────────────────────────────────────────────────────────
  describe("getMe", () => {
    it("returns user data when found", async () => {
      const mockData = { name: "Pablo", email: "p@test.com", userImage: "img.png" };
      (firestoreDB.collection as any).mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            empty: false,
            docs: [{ data: () => mockData }],
          }),
        }),
      });

      const result = await UserModel.getMe("p@test.com");
      expect(result).toEqual(mockData);
    });

    it("returns null when user is not found", async () => {
      (firestoreDB.collection as any).mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({ empty: true }),
        }),
      });

      const result = await UserModel.getMe("ghost@test.com");
      expect(result).toBeNull();
    });
  });

  // ── checkEmail ─────────────────────────────────────────────────────────────
  describe("checkEmail", () => {
    it("returns true when email exists", async () => {
      (firestoreDB.collection as any).mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({ empty: false }),
        }),
      });

      expect(await UserModel.checkEmail("exists@test.com")).toBe(true);
    });

    it("returns false when email does not exist", async () => {
      (firestoreDB.collection as any).mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({ empty: true }),
        }),
      });

      expect(await UserModel.checkEmail("new@test.com")).toBe(false);
    });

    it("returns false on error", async () => {
      (firestoreDB.collection as any).mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockRejectedValue(new Error("DB error")),
        }),
      });

      expect(await UserModel.checkEmail("user@test.com")).toBe(false);
    });
  });

  // ── deleteMe ───────────────────────────────────────────────────────────────
  describe("deleteMe", () => {
    it("deletes user and returns true when found", async () => {
      const mockDelete = vi.fn().mockResolvedValue(undefined);
      (firestoreDB.collection as any).mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            empty: false,
            docs: [{ ref: { delete: mockDelete } }],
          }),
        }),
      });

      const result = await UserModel.deleteMe("user@test.com");
      expect(mockDelete).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it("returns false when user not found", async () => {
      (firestoreDB.collection as any).mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({ empty: true }),
        }),
      });

      expect(await UserModel.deleteMe("ghost@test.com")).toBe(false);
    });
  });
});
