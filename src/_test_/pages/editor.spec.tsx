import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditorPage from "@/pages/editor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// 1. Mock Next Router & Next-Auth
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("Editor Dashboard Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render loading state correctly", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "loading",
    });

    render(<EditorPage />);
    expect(screen.getByText(/checking permissions/i)).toBeInTheDocument();
  });

  it("should redirect to login if user is unauthenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<EditorPage />);
    
    // Pastikan useEffect memicu push ke login
    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });

  it("should redirect to home if user is authenticated but rolenya 'member'", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { fullname: "Salsa Member", role: "member" } },
      status: "authenticated",
    });

    render(<EditorPage />);
    
    // User biasa tidak boleh di sini, redirect ke home
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("should render content correctly if user is an 'editor'", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { fullname: "Salsabila Editor", role: "editor" } },
      status: "authenticated",
    });

    render(<EditorPage />);

    expect(screen.getByText("Dashboard Editor")).toBeInTheDocument();
    expect(screen.getByText("Salsabila Editor")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should allow access if user is an 'admin'", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { fullname: "Salsa Admin", role: "admin" } },
      status: "authenticated",
    });

    render(<EditorPage />);

    expect(screen.getByText(/manajemen konten/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});