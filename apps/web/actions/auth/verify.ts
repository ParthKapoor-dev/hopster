"use server";

import { setCookie } from "@/lib/cookies";
import axios from "axios";

export default async function TokenVerification(token: string) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/users/verify";

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200) {
      await setCookie("authToken", response.data.token);
    }

    console.log(response);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
