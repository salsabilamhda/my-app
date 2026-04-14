import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index"; // Sesuaikan path jika folder pages kamu di src atau root

// 1. Mock next/head supaya tidak error saat pengetesan
jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("Home Page", () => {
  it("should render the title and student description correctly", () => {
    render(<Home />);

    // 2. Cek apakah Heading H1 muncul
    const heading = screen.getByRole("heading", { 
      level: 1, 
      name: /praktikum next\.js pages router/i 
    });
    expect(heading).toBeInTheDocument();

    // 3. Cek apakah teks deskripsi mahasiswa muncul
    const description = screen.getByText(/mahasiswa d4 pengembangan web/i);
    expect(description).toBeInTheDocument();
  });

  it("should have a break line between heading and paragraph", () => {
    const { container } = render(<Home />);
    
    // Cek keberadaan tag <br />
    const brTag = container.querySelector("br");
    expect(brTag).toBeInTheDocument();
  });
});