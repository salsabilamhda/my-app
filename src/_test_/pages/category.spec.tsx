import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryPage from "@/pages/category/[...slug]";
import { useRouter } from "next/router";

// 1. Mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Category Page (Catch-all Routes)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly when multiple slugs are provided in the URL", () => {
    // 2. Simulasi URL: /category/fashion/pria/sepatu
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        slug: ["fashion", "pria", "sepatu"],
      },
    });

    render(<CategoryPage />);

    // Memastikan judul utama ada
    expect(screen.getByText("Halaman Kategori")).toBeInTheDocument();

    // Memastikan semua item array dirender sebagai list item
    expect(screen.getByText("fashion")).toBeInTheDocument();
    expect(screen.getByText("pria")).toBeInTheDocument();
    expect(screen.getByText("sepatu")).toBeInTheDocument();
    
    // Memastikan jumlah list item sesuai
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  it("should display fallback message when slug is missing or not an array", () => {
    // Simulasi kondisi loading atau URL tanpa parameter tambahan
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    render(<CategoryPage />);

    expect(
      screen.getByText(/parameter tidak ditemukan atau sedang memuat/i)
    ).toBeInTheDocument();
    
    // Memastikan tidak ada list yang dirender
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should render correctly with a single slug in the array", () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        slug: ["elektronik"],
      },
    });

    render(<CategoryPage />);

    expect(screen.getByText("elektronik")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });
});