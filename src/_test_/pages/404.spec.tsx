import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Custom404 from "@/pages/404";

// Mock next/image karena Jest tidak bisa memproses optimasi gambar Next.js secara langsung
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe("404 Custom Page", () => {
  it("should render the 404 image correctly", () => {
    render(<Custom404 />);
    const image = screen.getByAltText("404");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/page-not-found.png");
  });

  it("should display the error message correctly", () => {
    render(<Custom404 />);
    
    // Cek judul (h1)
    expect(screen.getByText("404 - Halaman Tidak Ditemukan")).toBeInTheDocument();
    
    // Cek deskripsi (p)
    expect(
      screen.getByText(/maaf, halaman yang anda cari tidak ada/i)
    ).toBeInTheDocument();
  });

  it("should have a link that navigates back to home", () => {
    render(<Custom404 />);
    
    const backButton = screen.getByRole("link", { name: /kembali ke home/i });
    
    // Memastikan link mengarah ke root ("/")
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<Custom404 />);
    expect(asFragment()).toMatchSnapshot();
  });
});