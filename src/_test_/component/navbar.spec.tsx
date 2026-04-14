import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "@/components/layouts/navbar";
import { useSession, signIn, signOut } from "next-auth/react";

// 1. Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// 2. Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render sign in button and trigger signIn function", () => {
    // Simulasi user belum login
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Navbar />);

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();

    // SIMULASI KLIK (Untuk menaikkan % Functions & Lines)
    fireEvent.click(signInButton);
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("should render user info and trigger signOut function", () => {
    const mockUser = {
      fullname: "Salsabila Mahda",
      image: "/profile.png",
    };

    // Simulasi user sudah login
    (useSession as jest.Mock).mockReturnValue({
      data: { user: mockUser },
      status: "authenticated",
    });

    render(<Navbar />);

    // Cek tampilan
    expect(screen.getByText(/welcome, salsabila mahda/i)).toBeInTheDocument();
    
    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();

    // SIMULASI KLIK (Untuk menaikkan % Functions & Lines)
    fireEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it("should render branding title element", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    const { container } = render(<Navbar />);
    
    // Cek elemen brand untuk suntikan script
    const brandDiv = container.querySelector('#title');
    expect(brandDiv).toBeInTheDocument();
  });

  it("should not render image if user has no image", () => {
    // Simulasi user login tapi tidak punya foto (untuk cover branch logic)
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { fullname: "Salsa No Image" } },
      status: "authenticated",
    });

    render(<Navbar />);
    
    const image = screen.queryByRole("img");
    expect(image).not.toBeInTheDocument();
  });
});