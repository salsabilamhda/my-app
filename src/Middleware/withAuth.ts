import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        // Gunakan string langsung jika process.env bermasalah (untuk tes)
        secret: process.env.NEXTAUTH_SECRET, 
      });

      // --- CEK TERMINAL VS CODE ANDA SAAT AKSES /PROFILE ---
      console.log("--- DEBUG MIDDLEWARE ---");
      console.log("Path:", pathname);
      console.log("Token ditemukan:", !!token);
      // ----------------------------------------------------

      if (!token) {
        const loginUrl = new URL("/", req.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    return middleware(req, next);
  }
}