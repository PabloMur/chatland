import { describe, it, expect } from "vitest";
import { passwordsAreEqual, generarNumeroAleatorio } from "@/lib/tools";

describe("passwordsAreEqual", () => {
  it("returns true when passwords match", () => {
    expect(passwordsAreEqual("abc123", "abc123")).toBe(true);
  });

  it("returns false when passwords differ", () => {
    expect(passwordsAreEqual("abc123", "xyz789")).toBe(false);
  });

  it("returns false when one is empty", () => {
    expect(passwordsAreEqual("abc123", "")).toBe(false);
  });

  it("returns true for two empty strings", () => {
    expect(passwordsAreEqual("", "")).toBe(true);
  });

  it("is case-sensitive", () => {
    expect(passwordsAreEqual("Password", "password")).toBe(false);
  });
});

describe("generarNumeroAleatorio", () => {
  it("returns a 5-digit number (10000–99999)", () => {
    const num = generarNumeroAleatorio();
    expect(num).toBeGreaterThanOrEqual(10000);
    expect(num).toBeLessThanOrEqual(99999);
  });

  it("returns a number type", () => {
    expect(typeof generarNumeroAleatorio()).toBe("number");
  });

  it("returns an integer", () => {
    const num = generarNumeroAleatorio();
    expect(Number.isInteger(num)).toBe(true);
  });

  it("produces different values across calls (non-deterministic)", () => {
    const results = new Set(Array.from({ length: 20 }, () => generarNumeroAleatorio()));
    // With 90000 possible values it's virtually impossible to get all the same
    expect(results.size).toBeGreaterThan(1);
  });
});
