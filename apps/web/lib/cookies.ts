"use server";
import "server-only";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  const store = await cookies();
  store.set(key, value);
}

export async function getCookie(key: string) {
  const store = await cookies();
  store.get(key);
}

export async function removeCookie(key: string) {}
