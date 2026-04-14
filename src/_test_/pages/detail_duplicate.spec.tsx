import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HalamanDetailProduk from "../../pages/produk/[id]_duplicate";
import { useRouter } from "next/router";
import React from "react";

// 1. Mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// 2. Mock TampilanProduk View
jest.mock("../../views/produk/index_duplicate", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="tampilan-produk">Mock View Produk</div>,
  };
});

describe("Halaman Detail Produk Duplicate", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render TampilanProduk if user is logged in", () => {
    // Di kodingan Salsa, default isLogin adalah true
    render(<HalamanDetailProduk />);

    expect(screen.getByTestId("tampilan-produk")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should redirect to login and return null if user is not logged in", async () => {
    // Trik Coverage: Pakai spyOn untuk mengubah state isLogin menjadi false
    jest.spyOn(React, "useState").mockReturnValueOnce([false, jest.fn()]);

    const { container } = render(<HalamanDetailProduk />);

    // Memastikan useEffect memanggil redirect
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/auth/login");
    });

    // Memastikan merender null (container kosong)
    expect(container.firstChild).toBeNull();
  });
});