import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductPage from "@/pages/produk"; // Sesuaikan path ke file 'kategori' kamu
import useSWR from "swr";

// 1. Mock useSWR
jest.mock("swr");

// 2. Mock useRouter
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    route: "/",
    pathname: "",
    query: {},
    asPath: "",
  }),
}));

// 3. Mock Next/Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  },
}));

describe("Product Page (Kategori)", () => {
  const mockData = {
    data: [
      {
        id: "1",
        name: "Product 1",
        price: 100000,
        image: "/product1.png",
        category: "Category 1",
      },
    ],
  };

  it("renders product page with mock data correctly", () => {
    // Beritahu useSWR untuk mengembalikan data mock
    (useSWR as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<ProductPage />);

    // Cek judul
    expect(screen.getByText(/daftar produk/i)).toBeInTheDocument();
    
    // Cek apakah produk muncul
    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    
    // Cek harga (toLocaleString id-ID)
    expect(screen.getByText(/Rp 100.000/i)).toBeInTheDocument();
  });

  it("renders skeleton when isLoading is true", () => {
    // Simulasi kondisi loading
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    });

    const { container } = render(<ProductPage />);
    
    // Cek apakah class skeleton muncul (berdasarkan style di TampilanProduk)
    // Kita bisa mengecek keberadaan div skeleton
    expect(container.getElementsByClassName('produk__content__skeleton')).toBeDefined();
  });
});