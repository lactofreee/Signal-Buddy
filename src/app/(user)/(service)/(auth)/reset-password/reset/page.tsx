import { ResetPassword } from "@/src/features/auth/auth-reset-pw/components/reset-password";

type Props = {
  searchParams?: Promise<{ email: string; date: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const searchparams = await searchParams;
  return <ResetPassword searchparams={searchparams} />;
}
