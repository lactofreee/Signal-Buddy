"use client";

import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";

type Props = {
  children: React.ReactNode;
};

export default function RootProvider({ children }: Props) {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
}
