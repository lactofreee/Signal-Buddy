import { create } from "zustand";

// 상태와 액션에 대한 타입 정의
interface ToolbarState {
  isMobileToolbarOpen: boolean; // 상태
  toggleMobileToolbar: () => void; // 상태를 토글하는 액션
  closeMobileToolbar: () => void; // 상태를 닫는 액션
}

// zustand 스토어 생성
const useToolbarStore = create<ToolbarState>((set) => ({
  isMobileToolbarOpen: false, // 초기 상태
  toggleMobileToolbar: () =>
    set((state) => ({ isMobileToolbarOpen: !state.isMobileToolbarOpen })),
  closeMobileToolbar: () => set({ isMobileToolbarOpen: false }),
}));

export default useToolbarStore;
