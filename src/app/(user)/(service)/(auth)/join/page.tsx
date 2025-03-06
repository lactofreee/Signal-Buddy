import { JoinForm } from "@/src/components/auth/join-form/join-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <JoinForm />
    </Suspense>
  );
}
