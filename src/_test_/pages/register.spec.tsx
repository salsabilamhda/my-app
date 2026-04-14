import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// 1. Gunakan relative path untuk import halamannya
import HalamanRegister from "../../pages/auth/register";

// 2. Mock komponen View dengan relative path juga
// Pastikan jumlah "../" sesuai dengan posisi folder src/_test_/pages/ kamu
jest.mock("../../views/auth/register", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="tampilan-register">Mock Tampilan Register</div>,
  };
});

// 3. Mock next/link karena di file aslimu ada import Link
jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

describe("Register Page", () => {
  it("should render TampilanRegister component correctly", () => {
    render(<HalamanRegister />);

    // Verifikasi apakah komponen yang di-mock muncul
    const viewComponent = screen.getByTestId("tampilan-register");
    expect(viewComponent).toBeInTheDocument();
    expect(viewComponent).toHaveTextContent("Mock Tampilan Register");
  });
});