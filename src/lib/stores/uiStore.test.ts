import { describe, it, expect, beforeEach } from "vitest";
import { useUIStore } from "@/lib/stores/uiStore";

describe("useUIStore", () => {
  beforeEach(() => {
    useUIStore.setState({
      menuActive: false,
      loader: false,
      getInRoomModal: false,
      shareCodeModal: false,
      deleteRoomModal: false,
    });
  });

  it("has correct initial state", () => {
    const s = useUIStore.getState();
    expect(s.menuActive).toBe(false);
    expect(s.loader).toBe(false);
    expect(s.getInRoomModal).toBe(false);
    expect(s.shareCodeModal).toBe(false);
    expect(s.deleteRoomModal).toBe(false);
  });

  it("setLoader enables and disables loader", () => {
    useUIStore.getState().setLoader(true);
    expect(useUIStore.getState().loader).toBe(true);
    useUIStore.getState().setLoader(false);
    expect(useUIStore.getState().loader).toBe(false);
  });

  it("setMenuActive toggles menu", () => {
    useUIStore.getState().setMenuActive(true);
    expect(useUIStore.getState().menuActive).toBe(true);
    useUIStore.getState().setMenuActive(false);
    expect(useUIStore.getState().menuActive).toBe(false);
  });

  it("setGetInRoomModal opens and closes modal", () => {
    useUIStore.getState().setGetInRoomModal(true);
    expect(useUIStore.getState().getInRoomModal).toBe(true);
    useUIStore.getState().setGetInRoomModal(false);
    expect(useUIStore.getState().getInRoomModal).toBe(false);
  });

  it("setShareCodeModal opens and closes modal", () => {
    useUIStore.getState().setShareCodeModal(true);
    expect(useUIStore.getState().shareCodeModal).toBe(true);
    useUIStore.getState().setShareCodeModal(false);
    expect(useUIStore.getState().shareCodeModal).toBe(false);
  });

  it("setDeleteRoomModal opens and closes modal", () => {
    useUIStore.getState().setDeleteRoomModal(true);
    expect(useUIStore.getState().deleteRoomModal).toBe(true);
    useUIStore.getState().setDeleteRoomModal(false);
    expect(useUIStore.getState().deleteRoomModal).toBe(false);
  });

  it("modals are independent", () => {
    useUIStore.getState().setShareCodeModal(true);
    expect(useUIStore.getState().deleteRoomModal).toBe(false);
    expect(useUIStore.getState().getInRoomModal).toBe(false);
  });
});
