import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// Gunakan path relatif agar Jest lebih mudah menemukan filenya
import Appsetting from "../../pages/setting/app"; 

describe("App Setting Page", () => {
  it("should render the app setting page text correctly", () => {
    render(<Appsetting />);

    // Mencari teks "App Setting Page" (case-insensitive)
    const textElement = screen.getByText(/app setting page/i);
    
    // Memastikan teks tersebut ada di dalam dokumen
    expect(textElement).toBeInTheDocument();
  });

  it("should be wrapped in a div element", () => {
    const { container } = render(<Appsetting />);
    
    // Memastikan elemen pertama adalah div
    expect(container.firstChild?.nodeName).toBe("DIV");
  });
});