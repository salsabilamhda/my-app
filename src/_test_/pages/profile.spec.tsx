import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HalamanProfile from "@/pages/profile"; // Sesuaikan path jika berada di views
import { useSession } from "next-auth/react";

// 1. Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("Halaman Profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state when status is loading", () => {
    // Simulasi status loading
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "loading",
    });

    render(<HalamanProfile />);
    expect(screen.getByText(/memuat data.../i)).toBeInTheDocument();
  });

  it("should render user data correctly when authenticated", () => {
    // Simulasi user sudah login
    const mockUser = {
      user: {
        fullname: "Salsabila Mahda",
        email: "salsa@gmail.com",
      },
    };

    (useSession as jest.Mock).mockReturnValue({
      data: mockUser,
      status: "authenticated",
    });

    render(<HalamanProfile />);

    // Cek apakah nama dan email muncul
    expect(screen.getByText("Salsabila Mahda")).toBeInTheDocument();
    expect(screen.getByText("salsa@gmail.com")).toBeInTheDocument();

    // Cek inisial avatar (Huruf pertama dari Salsabila adalah 'S')
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("should render fallback text when user fullname is missing", () => {
    // Simulasi data user tanpa nama lengkap
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "user@test.com" } },
      status: "authenticated",
    });

    render(<HalamanProfile />);

    // Cek teks default "Pengguna" dan inisial default "U"
    expect(screen.getByText("Pengguna")).toBeInTheDocument();
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("should display the verified badge", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { fullname: "Salsa" } },
      status: "authenticated",
    });

    render(<HalamanProfile />);
    expect(screen.getByText(/akun terverifikasi/i)).toBeInTheDocument();
  });
});