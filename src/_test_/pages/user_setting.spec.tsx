import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// Gunakan path relatif untuk memastikan file terdeteksi dengan benar oleh Jest
import UserSettingPage from "../../pages/setting/user/password/index";

describe("User Setting Page (Password)", () => {
  it("should render the password user page correctly", () => {
    render(<UserSettingPage />);

    // Mencari teks yang ada di komponen
    const element = screen.getByText(/password user page/i);
    
    // Memastikan teks tersebut ada di dalam dokumen (DOM)
    expect(element).toBeInTheDocument();
  });

  it("should have the correct container structure", () => {
    const { container } = render(<UserSettingPage />);
    
    // Memastikan konten dibungkus oleh sebuah tag div
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});