import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// Gunakan path relatif untuk memastikan file terdeteksi oleh Jest
import UserSettingPage from "../../pages/user/index";

describe("User Setting Page", () => {
  it("should render the user setting page correctly", () => {
    render(<UserSettingPage />);

    // Mencari teks yang ada di komponen (case-insensitive)
    const element = screen.getByText(/user setting page/i);
    
    // Memastikan teks tersebut ada di dalam DOM
    expect(element).toBeInTheDocument();
  });

  it("should have a div as the root element", () => {
    const { container } = render(<UserSettingPage />);
    
    // Memastikan elemen pertama adalah <div>
    expect(container.firstChild?.nodeName).toBe("DIV");
  });
});