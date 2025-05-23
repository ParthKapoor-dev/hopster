import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getItem } from "./lib/localStorage";

const protectedRoutes = ["/dashboard"];

export function middleware(req: NextRequest) {
  // const accessToken = getItem("authToken");
  // const url = req.nextUrl.clone();

  // if (protectedRoutes.includes(url.pathname) && !accessToken) {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}
