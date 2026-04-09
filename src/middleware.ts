import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./Middleware/withAuth"; 

export function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

// --- PERBAIKAN: Tambahkan "/admin" ke dalam daftar requireAuth ---
export default withAuth(mainMiddleware, [
  "/profile", 
  "/produk", 
  "/about", 
  "/admin" // <--- WAJIB DITAMBAHKAN
]);

// --- PERBAIKAN: Tambahkan "/admin" ke dalam config matcher ---
export const config = {
  matcher: [
    "/profile", 
    "/produk", 
    "/about", 
    "/admin" // <--- WAJIB DITAMBAHKAN
  ],
};