import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// 1. Import Page dan getStaticProps menggunakan relative path
import HalamanProdukStatic, { getStaticProps } from "../../pages/produk/static";

// 2. Mock komponen TampilanProduk dari folder views
jest.mock("../../views/produk/index", () => {
  return {
    __esModule: true,
    default: ({ products }: any) => (
      <div data-testid="tampilan-produk-static">
        {products?.map((p: any) => (
          <p key={p.id}>{p.name}</p>
        ))}
      </div>
    ),
  };
});

// 3. Mock global fetch
global.fetch = jest.fn();

describe("Halaman Produk Static", () => {
  const mockProducts = [
    { id: "s1", name: "Kripik Singkong", price: 5000, image: "", category: "" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Test Komponen ---
  it("should render the static page heading and product list", () => {
    render(<HalamanProdukStatic products={mockProducts} />);

    expect(screen.getByText(/halaman produk static/i)).toBeInTheDocument();
    expect(screen.getByText("Kripik Singkong")).toBeInTheDocument();
  });

  // --- Test getStaticProps (Kunci 100% Lines) ---
  describe("getStaticProps", () => {
    it("should fetch products and return props with revalidate", async () => {
      // Simulasi respons fetch sukses
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({ data: mockProducts }),
      });

      const response = await getStaticProps();

      // Pastikan URL fetch benar (menggunakan 127.0.0.1 sesuai kodinganmu)
      expect(global.fetch).toHaveBeenCalledWith("http://127.0.0.1:3000/api/produk");
      
      // Pastikan revalidate ada (Kunci 100% Branch/Statement)
      expect(response).toEqual({
        props: {
          products: mockProducts,
        },
        revalidate: 10,
      });
    });

    it("should handle empty response data gracefully", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({ data: [] }),
      });

      const response = await getStaticProps();
      expect(response.props.products).toEqual([]);
    });
  });
});