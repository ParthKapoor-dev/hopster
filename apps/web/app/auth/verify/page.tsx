"use client";

import TokenVerification from "@/actions/auth/verify";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyTokenPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  useEffect(() => {
    async function verify() {
      try {
        await TokenVerification(token!);
        router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    }
    verify();
  });

  return <div>Please Wait, while we are verifying your email</div>;
}
