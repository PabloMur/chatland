import { describe, it, expect, beforeEach } from "vitest";
import { useRoomStore } from "@/lib/stores/roomStore";

describe("useRoomStore", () => {
  beforeEach(() => {
    useRoomStore.setState({ roomCode: "00000", realtimeCode: "" });
  });

  it("has correct initial state", () => {
    const s = useRoomStore.getState();
    expect(s.roomCode).toBe("00000");
    expect(s.realtimeCode).toBe("");
  });

  it("setRoomCode updates room code", () => {
    useRoomStore.getState().setRoomCode("54321");
    expect(useRoomStore.getState().roomCode).toBe("54321");
  });

  it("setRealtimeCode updates realtime code", () => {
    useRoomStore.getState().setRealtimeCode("firebase-realtime-key");
    expect(useRoomStore.getState().realtimeCode).toBe("firebase-realtime-key");
  });

  it("both codes update independently", () => {
    useRoomStore.getState().setRoomCode("11111");
    useRoomStore.getState().setRealtimeCode("abc-xyz");
    const s = useRoomStore.getState();
    expect(s.roomCode).toBe("11111");
    expect(s.realtimeCode).toBe("abc-xyz");
  });
});
