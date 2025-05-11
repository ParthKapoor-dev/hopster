"use client";

import TokenVerification from "@/actions/auth/verify";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyTokenPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    async function verify() {
      await TokenVerification(email!, token!);
    }
    verify();
  });

  return <div>Please Wait, while we are verifying your email</div>;
}
