"use client";

import { useState } from "react";
import ProfileEdit from "./ProfileEdit";
import { User } from "next-auth";
import UserConfirm from "./UserConfirm";
type Props = {
  user: User;
};

export default function UserEdit({ user }: Props) {
  const [confirm, setConfirm] = useState<boolean>(false);
  return (
    <>
      {confirm ? (
        <ProfileEdit user={user} />
      ) : (
        <UserConfirm onConfirm={() => setConfirm(true)} />
      )}
    </>
  );
}
