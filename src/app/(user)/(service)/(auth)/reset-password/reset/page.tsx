import { ResetPassword } from "@/src/components/auth/reset-password/reset-password";

type Props = {
  searchParams?: Promise<{ email: string; date: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const searchparams = await searchParams;
  return <ResetPassword searchparams={searchparams} />;
}
