import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// 1. Gunakan relative path untuk import halamannya
import HalamanProdukServer, { getServerSideProps } from "../../pages/produk/server";

// 2. Mock komponen TampilanProduk menggunakan relative path
// Dari src/_test_/pages ke src/views/produk butuh keluar 2x (../../)
jest.mock("../../views/produk", () => {
  return {
    __esModule: true,
    default: ({ products }: any) => (
      <div data-testid="tampilan-produk">
        {products?.map((p: any) => (
          <p key={p.id}>{p.name}</p>
        ))}
      </div>
    ),
  };
});

// 3. Mock global fetch
global.fetch = jest.fn();

describe("Halaman Produk Server", () => {
  const mockProducts = [
    { id: "1", name: "Lumpia Basah", price: 15000, image: "", category: "" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Test Komponen ---
  it("should render the heading and TampilanProduk correctly", () => {
    render(<HalamanProdukServer products={mockProducts} />);

    expect(screen.getByText(/halaman produk server/i)).toBeInTheDocument();
    expect(screen.getByText("Lumpia Basah")).toBeInTheDocument();
  });

  // --- Test getServerSideProps ---
  describe("getServerSideProps", () => {
    it("should fetch products from API and return them as props", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({ data: mockProducts }),
      });

      const response = await getServerSideProps();

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/api/produk");
      expect(response).toEqual({
        props: {
          products: mockProducts,
        },
      });
    });

    it("should return empty array if data is not available", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({ data: null }),
      });

      const response = await getServerSideProps();
      expect(response.props.products).toEqual([]);
    });
  });
});