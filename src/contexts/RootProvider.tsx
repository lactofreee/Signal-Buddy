"use client";

import QueryProvider from "../components/utils/QueryProvider";
import AuthContext from "./AuthContext";

type Props = {
  children: React.ReactNode;
};

export default function RootProvider({ children }: Props) {
  return (
    <AuthContext>
      <QueryProvider>{children}</QueryProvider>
    </AuthContext>
  );
}
