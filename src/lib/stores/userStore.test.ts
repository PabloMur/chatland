import { describe, it, expect, beforeEach } from "vitest";
import { useUserStore } from "@/lib/stores/userStore";

const defaultState = {
  userName: "user",
  userEmail: "",
  userImage: "",
  userPassword: "",
  userToken: "",
  userRooms: [],
  userGuestRooms: [],
};

describe("useUserStore", () => {
  beforeEach(() => {
    useUserStore.setState(defaultState);
  });

  it("has correct initial state", () => {
    const s = useUserStore.getState();
    expect(s.userName).toBe("user");
    expect(s.userEmail).toBe("");
    expect(s.userToken).toBe("");
    expect(s.userRooms).toEqual([]);
    expect(s.userGuestRooms).toEqual([]);
  });

  it("setUserEmail updates email", () => {
    useUserStore.getState().setUserEmail("pablo@test.com");
    expect(useUserStore.getState().userEmail).toBe("pablo@test.com");
  });

  it("setUserToken updates token", () => {
    useUserStore.getState().setUserToken("jwt.token.here");
    expect(useUserStore.getState().userToken).toBe("jwt.token.here");
  });

  it("setUserToken to empty string clears token (logout)", () => {
    useUserStore.getState().setUserToken("some-token");
    useUserStore.getState().setUserToken("");
    expect(useUserStore.getState().userToken).toBe("");
  });

  it("setUserRooms updates rooms array", () => {
    useUserStore.getState().setUserRooms(["12345", "67890"]);
    expect(useUserStore.getState().userRooms).toEqual(["12345", "67890"]);
  });

  it("setUserGuestRooms updates guest rooms", () => {
    useUserStore.getState().setUserGuestRooms(["room1"]);
    expect(useUserStore.getState().userGuestRooms).toEqual(["room1"]);
  });

  it("setUserImage updates image URL", () => {
    useUserStore.getState().setUserImage("https://res.cloudinary.com/img.png");
    expect(useUserStore.getState().userImage).toBe("https://res.cloudinary.com/img.png");
  });

  it("setUserPassword updates password", () => {
    useUserStore.getState().setUserPassword("secret123");
    expect(useUserStore.getState().userPassword).toBe("secret123");
  });

  it("setUserName updates name", () => {
    useUserStore.getState().setUserName("Pablo");
    expect(useUserStore.getState().userName).toBe("Pablo");
  });

  it("state updates are independent", () => {
    useUserStore.getState().setUserEmail("a@a.com");
    useUserStore.getState().setUserName("Ana");
    const s = useUserStore.getState();
    expect(s.userEmail).toBe("a@a.com");
    expect(s.userName).toBe("Ana");
    expect(s.userToken).toBe(""); // unchanged
  });
});
