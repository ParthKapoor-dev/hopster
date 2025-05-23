"use client";

import GetUser from "@/actions/auth/users/get";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    async function getDash() {
      try {
        await GetUser();
      } catch (err) {
        console.error(err);
      }
    }

    getDash();
  }, []);

  return <div>Dashboard</div>;
}
