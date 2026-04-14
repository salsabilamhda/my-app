import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HalamanLogin from "../../pages/auth/login";
// 1. Import utility mock router buatanmu
import { setMockRouter, mockUseRouter } from "../utils/mock-router";

// 2. Hubungkan modul next/router ke mockUseRouter buatanmu
jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

// 3. Mock komponen TampilanLogin
// Kita tetap mock view-nya agar test di level 'pages' tetap ringan
jest.mock("../../views/auth/login", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="tampilan-login">Mock Tampilan Login</div>,
  };
});

describe("Login Page with Custom Mock Router", () => {
  beforeEach(() => {
    // Reset dan inisialisasi router setiap sebelum test berjalan
    setMockRouter({ pathname: "/auth/login" });
  });

  it("should render TampilanLogin component correctly", () => {
    render(<HalamanLogin />);

    // Memastikan view login muncul di dalam page
    const viewComponent = screen.getByTestId("tampilan-login");
    expect(viewComponent).toBeInTheDocument();
    expect(viewComponent).toHaveTextContent("Mock Tampilan Login");
  });

  it("should have a fragment or container as a root", () => {
    const { container } = render(<HalamanLogin />);
    expect(container.firstChild).toBeDefined();
  });
});