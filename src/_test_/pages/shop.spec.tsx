import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HalamanToko from "../../pages/shop/[[...slug]]"; // Sesuaikan path relatifnya
import { useRouter } from "next/router";

// 1. Mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Halaman Toko (Optional Catch-all Routes)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly when multiple slugs are provided", () => {
    // Simulasi URL: /shop/elektronik/gadget
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        slug: ["elektronik", "gadget"],
      },
    });

    render(<HalamanToko />);

    // Memastikan kategori mengambil index pertama [0]
    expect(screen.getByText(/kategori: elektronik/i)).toBeInTheDocument();
    
    // Memastikan URL Path menggabungkan array dengan tanda hubung (-)
    expect(screen.getByText(/url path: elektronik-gadget/i)).toBeInTheDocument();
  });

  it("should render default state when no slug is provided", () => {
    // Simulasi URL: /shop (tanpa slug)
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    render(<HalamanToko />);

    // Memastikan teks fallback muncul
    expect(screen.getByText(/kategori: semua kategori/i)).toBeInTheDocument();
    expect(screen.getByText(/url path: path kosong/i)).toBeInTheDocument();
  });

  it("should handle single slug correctly", () => {
    // Simulasi URL: /shop/pakaian
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        slug: ["pakaian"],
      },
    });

    render(<HalamanToko />);

    expect(screen.getByText(/kategori: pakaian/i)).toBeInTheDocument();
    expect(screen.getByText(/url path: pakaian/i)).toBeInTheDocument();
  });
});