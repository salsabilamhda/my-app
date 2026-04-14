import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
// Gunakan relative path untuk import file aslinya
import App from "../../pages/_app";

// 1. Mock Next-Auth SessionProvider
jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}));

// 2. Mock Next Script
jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ id, strategy }: { id?: string; strategy?: string }) => (
    <script data-testid="next-script" id={id} data-strategy={strategy} />
  ),
}));

// 3. Mock AppShell (Gunakan Relative Path agar Jest tidak bingung mencari '@')
jest.mock("../../components/layouts/AppShell", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-shell">{children}</div>
  ),
}));

describe("_app.tsx", () => {
  const MockComponent = () => <div data-testid="child-component">Halaman Utama</div>;
  const mockPageProps = {
    session: null,
  };
  
  // Mock router minimalis untuk memenuhi kebutuhan AppProps
  const mockRouter = {
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(),
    prefetch: jest.fn(() => Promise.resolve()),
  } as any;

  it("should render SessionProvider, AppShell, and Component correctly", () => {
    const { getByTestId } = render(
      <App 
        Component={MockComponent} 
        pageProps={mockPageProps} 
        router={mockRouter} 
      />
    );

    // Verifikasi struktur pembungkus
    expect(getByTestId("session-provider")).toBeInTheDocument();
    expect(getByTestId("app-shell")).toBeInTheDocument();
    expect(getByTestId("child-component")).toBeInTheDocument();
  });

  it("should render Google Analytics scripts", () => {
    const { getAllByTestId } = render(
      <App 
        Component={MockComponent} 
        pageProps={mockPageProps} 
        router={mockRouter} 
      />
    );

    const scripts = getAllByTestId("next-script");
    expect(scripts.length).toBeGreaterThanOrEqual(1);
  });
});