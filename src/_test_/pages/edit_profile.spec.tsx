import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditProfilePage from "@/pages/profile/edit"; // Sesuaikan path-nya

describe("Edit Profile Page", () => {
  it("should render the edit profile page correctly", () => {
    render(<EditProfilePage />);

    // 1. Cek judul H1
    const heading = screen.getByRole("heading", { level: 1, name: /edit profile/i });
    expect(heading).toBeInTheDocument();

    // 2. Cek teks deskripsi
    const description = screen.getByText(/ini adalah halaman edit profile/i);
    expect(description).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<EditProfilePage />);
    
    // Snapshot berguna untuk memastikan tidak ada perubahan UI yang tak sengaja di masa depan
    expect(asFragment()).toMatchSnapshot();
  });
});