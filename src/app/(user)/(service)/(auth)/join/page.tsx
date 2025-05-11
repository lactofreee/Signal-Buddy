import { JoinForm } from "@/src/features/auth/auth-join/components/join-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <JoinForm />
    </Suspense>
  );
}
