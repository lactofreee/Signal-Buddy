import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>관리자 레이아웃</h1>
      {children}
    </div>
  );
}