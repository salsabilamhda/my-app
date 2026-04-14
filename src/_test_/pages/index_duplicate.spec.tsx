import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// 1. Import Page: Keluar 2x ke src, lalu masuk ke pages/produk
import ProdukPage from "../../pages/produk/index_duplicate";

// 2. Mock View: Keluar 2x ke src, lalu masuk ke views/produk
jest.mock("../../views/produk/index_duplicate", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="tampilan-produk-view">Mock Tampilan Produk View</div>,
  };
});

describe("Produk Page (Duplicate)", () => {
  it("should render the TampilanProduk view component correctly", () => {
    render(<ProdukPage />);

    // Cek apakah view-nya muncul
    const viewComponent = screen.getByTestId("tampilan-produk-view");
    expect(viewComponent).toBeInTheDocument();
    expect(viewComponent).toHaveTextContent("Mock Tampilan Produk View");
  });
});