import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HalamanAdmin from "@/pages/admin";

describe("Admin Page", () => {
  it("should render admin page correctly", () => {
    // 1. Snapshot test
    const { asFragment } = render(<HalamanAdmin />);
    expect(asFragment()).toMatchSnapshot();

    // 2. getByTestId dan toBe()
    // Mengambil elemen h1 lewat testid dan mencocokkan teksnya
    const titleElement = screen.getByTestId("admin-title");
    expect(titleElement.textContent).toBe("Halaman Admin");

    // Tambahan: Memastikan paragraf selamat datang muncul
    const welcomeText = screen.getByText(/selamat datang di halaman admin/i);
    expect(welcomeText).toBeInTheDocument();
  });
});