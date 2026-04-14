// @ts-ignore
import middlewareUtama, { mainMiddleware, config } from "../middleware"; 
import { NextResponse } from "next/server";

// 1. Mocking Environment
if (typeof global.Request === 'undefined') {
  global.Request = class {} as any;
}

// 2. Mock next/server
jest.mock("next/server", () => ({
  NextResponse: {
    next: jest.fn(() => ({ status: 200 })),
  },
}));

// 3. Mock withAuth (KUNCI: Harus return fungsi agar bisa dipanggil)
jest.mock("../Middleware/withAuth", () => {
  return jest.fn((middleware) => {
    return (req: any) => middleware(req);
  });
});

describe("Middleware Final Coverage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should execute mainMiddleware logic", () => {
    const mockRequest = { nextUrl: { pathname: "/admin" } } as any;
    const result = mainMiddleware(mockRequest);
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("should verify the actual config object", () => {
    const expectedPaths = ["/profile", "/produk", "/about", "/admin"];
    expect(config.matcher).toEqual(expect.arrayContaining(expectedPaths));
    expect(config.matcher).toHaveLength(4);
  });

  it("should execute the default export (withAuth wrapper)", async () => {
    // KUNCI 100%: Memanggil export default middlewareUtama
    // Ini akan memicu baris 'export default withAuth(...)' tereksekusi
    const mockRequest = { nextUrl: { pathname: "/admin" } } as any;
    
    // middlewareUtama adalah fungsi hasil dari withAuth(mainMiddleware, [...])
    const result = await middlewareUtama(mockRequest, {} as any);
    
    expect(result).toBeDefined();
  });
});