import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./Middleware/withAuth"; 

export function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

// Hanya daftarkan halaman yang memang butuh proteksi
export default withAuth(mainMiddleware, ["/profile", "/produk", "/about"]);

export const config = {
  matcher: ["/profile", "/produk", "/about"],
};