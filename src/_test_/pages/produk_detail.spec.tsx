import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HalamanProduk, { getStaticPaths, getStaticProps } from "../../pages/produk/[id]";

// 1. Mock DetailProduk View
jest.mock("../../views/DetailProduct", () => {
  return {
    __esModule: true,
    default: ({ products }: any) => (
      <div data-testid="detail-produk">
        {products ? products.name : "No Product"}
      </div>
    ),
  };
});

// 2. Mock Global Fetch
global.fetch = jest.fn();

describe("Halaman Detail Produk (SSG)", () => {
  const mockProduct = { id: "1", name: "Kue Balok", price: 20000, image: "", category: "" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Test Komponen Tampilan ---
  it("should render DetailProduk with the correct product data", () => {
    render(<HalamanProduk product={mockProduct} />);
    
    const detail = screen.getByTestId("detail-produk");
    expect(detail).toBeInTheDocument();
    expect(detail).toHaveTextContent("Kue Balok");
  });

  // --- Test getStaticPaths (Kunci 100% Fungsi) ---
  describe("getStaticPaths", () => {
    it("should fetch all products and return paths correctly", async () => {
      const mockAllProducts = {
        data: [{ id: "1" }, { id: "2" }]
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockAllProducts),
      });

      const response = await getStaticPaths();

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/products');
      expect(response).toEqual({
        paths: [
          { params: { id: "1" } },
          { params: { id: "2" } }
        ],
        fallback: false
      });
    });
  });

  // --- Test getStaticProps (Kunci 100% Lines) ---
  describe("getStaticProps", () => {
    it("should fetch a single product data based on ID", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({ data: mockProduct }),
      });

      const context = { params: { id: "1" } };
      const response = await getStaticProps(context);

      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3000/api/produk/1`);
      expect(response).toEqual({
        props: {
          product: mockProduct,
        }
      });
    });
  });
});