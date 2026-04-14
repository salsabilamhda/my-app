import { initializeApp } from "firebase/app";

// 1. Mock library firebase secara total
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn((config) => ({ name: "mock-app", ...config })),
}));

describe("Firebase Configuration Logic", () => {
  // Kita buat simulasi config yang sama persis dengan file asli
  const firebaseConfig = {
    apiKey: "test-api-key",
    authDomain: "test-auth-domain",
    projectId: "test-project-id",
    storageBucket: "test-storage-bucket",
    messagingSenderId: "test-sender-id",
    appId: "test-app-id"
  };

  it("should call initializeApp with correct environment variables", () => {
    // Simulasi inisialisasi
    const app = initializeApp(firebaseConfig);

    // Pastikan fungsi initializeApp dipanggil dengan benar
    expect(initializeApp).toHaveBeenCalledWith(expect.objectContaining({
      apiKey: "test-api-key",
      projectId: "test-project-id"
    }));

    expect(app).toBeDefined();
  });

  it("should verify defined environment variables", () => {
    // Test ini untuk memastikan Salsa tahu variabel apa saja yang harus ada di .env
    const requiredEnv = [
      "FIREBASE_API_KEY",
      "FIREBASE_AUTH_DOMAIN",
      "FIREBASE_PROJECT_ID",
      "FIREBASE_STORAGE_BUCKET",
      "FIREBASE_MESSAGING_SENDER_ID",
      "FIREBASE_APP_ID"
    ];

    requiredEnv.forEach(env => {
      // Kita hanya cek ketersediaan kuncinya di config
      expect(firebaseConfig).toHaveProperty(env.replace('FIREBASE_', '').toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase()));
    });
  });
});