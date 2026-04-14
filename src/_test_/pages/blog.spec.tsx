import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogDetail from "@/pages/blog/[slug]"; // Sesuaikan path-nya
import { useRouter } from "next/router";

// 1. Mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Blog Detail Page", () => {
  it("should render correctly with the provided slug from URL", () => {
    // 2. Simulasi nilai slug di URL (misal: /blog/artikel-keren)
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        slug: "artikel-keren",
      },
    });

    render(<BlogDetail />);

    // 3. Pastikan teks Slug muncul sesuai nilai mock
    const slugText = screen.getByText(/slug: artikel-keren/i);
    expect(slugText).toBeInTheDocument();
  });

  it("should render correctly when slug is empty", () => {
    // Simulasi kondisi saat slug belum terisi (loading state)
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    render(<BlogDetail />);

    const slugText = screen.getByText(/slug:/i);
    expect(slugText).toBeInTheDocument();
    expect(slugText).toHaveTextContent("Slug:");
  });
});