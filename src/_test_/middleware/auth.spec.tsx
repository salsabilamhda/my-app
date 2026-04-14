import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import withAuth from "@/Middleware/withAuth";

// 1. Mock next-auth/jwt
jest.mock("next-auth/jwt", () => ({
  getToken: jest.fn(),
}));

// 2. Mock next/server
jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn(),
    next: jest.fn(),
  },
}));

describe("withAuth Middleware", () => {
  const mockMiddleware = jest.fn();
  const requireAuth = ["/admin", "/profile"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to login if no token and path is in requireAuth", async () => {
    (getToken as jest.Mock).mockResolvedValue(null);

    const req = {
      nextUrl: { pathname: "/profile" },
      url: "http://localhost:3000/profile",
    } as unknown as NextRequest;

    const middlewareWithAuth = withAuth(mockMiddleware, requireAuth);
    await middlewareWithAuth(req, {} as any);

    // Pastikan diarahkan ke halaman login
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: "/auth/login",
      })
    );
  });

  it("should redirect to home if user is not admin and tries to access admin path", async () => {
    // User login tapi role-nya 'member'
    (getToken as jest.Mock).mockResolvedValue({ role: "member" });

    const req = {
      nextUrl: { pathname: "/admin" },
      url: "http://localhost:3000/admin",
    } as unknown as NextRequest;

    const middlewareWithAuth = withAuth(mockMiddleware, requireAuth);
    await middlewareWithAuth(req, {} as any);

    // Pastikan diarahkan balik ke home ("/") karena bukan admin
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: "/",
      })
    );
  });

  it("should call next middleware if user is authorized (admin accessing admin)", async () => {
    // User login sebagai admin
    (getToken as jest.Mock).mockResolvedValue({ role: "admin" });

    const req = {
      nextUrl: { pathname: "/admin" },
      url: "http://localhost:3000/admin",
    } as unknown as NextRequest;

    const middlewareWithAuth = withAuth(mockMiddleware, requireAuth);
    await middlewareWithAuth(req, {} as any);

    // Pastikan middleware asli dipanggil (tidak di-redirect)
    expect(mockMiddleware).toHaveBeenCalled();
  });

  it("should call middleware if path is not in requireAuth", async () => {
    const req = {
      nextUrl: { pathname: "/about" },
    } as unknown as NextRequest;

    const middlewareWithAuth = withAuth(mockMiddleware, requireAuth);
    await middlewareWithAuth(req, {} as any);

    expect(mockMiddleware).toHaveBeenCalled();
    expect(getToken).not.toHaveBeenCalled();
  });
});