import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppShell from "@/components/layouts/AppShell";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

// 1. Mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// 2. Mock next/font/google
jest.mock("next/font/google", () => ({
  Roboto: () => ({
    className: "mock-roboto-class",
  }),
}));

describe("AppShell Component", () => {
  // Fungsi helper untuk membungkus AppShell dengan SessionProvider
  const renderWithSession = (ui: React.ReactElement) => {
    return render(
      <SessionProvider session={null}>
        {ui}
      </SessionProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Navbar on regular pages", () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
    });

    renderWithSession(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );

    // Kita cek teks yang ada di Navbar asli kamu (misal tombol "Sign In")
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("should not render Navbar on disabled pages", () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/auth/login",
    });

    renderWithSession(
      <AppShell>
        <div>Login Page</div>
      </AppShell>
    );

    // Tombol "Sign In" tidak boleh ada karena navbar di-disable
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it("should apply Roboto font className", () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
    });

    const { container } = renderWithSession(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );

    const mainTag = container.querySelector("main");
    expect(mainTag).toHaveClass("mock-roboto-class");
  });
});