import { 
  signUp, 
  signIn, 
  loginWithOAuth, 
  retrieveProducts, 
  retrieveDataByID 
} from "@/utils/db/servicefirebase";
import { getDocs, addDoc, updateDoc, getDoc } from "firebase/firestore";
import bcrypt from "bcrypt";

// 1. Mock Firebase Firestore - PASTIKAN getDoc (tanpa s) SUDAH ADA DI SINI
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(), // <--- INI KUNCINYA, JANGAN SAMPAI KETINGGALAN
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn(() => "mock-timestamp"),
}));

// 2. Mock bcrypt
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

describe("Firebase Service Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- 1. TEST signIn ---
  describe("signIn", () => {
    it("should return user data when email exists", async () => {
      const mockUser = { id: "123", email: "salsa@gmail.com" };
      (getDocs as jest.Mock).mockResolvedValue({
        docs: [{ id: "123", data: () => mockUser }],
      });
      const result = await signIn("salsa@gmail.com");
      expect(result).toEqual(mockUser);
    });

    it("should return null when email does not exist", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ docs: [] });
      const result = await signIn("wrong@gmail.com");
      expect(result).toBeNull();
    });
  });

  // --- 2. TEST signUp ---
  describe("signUp", () => {
    it("should call success callback when registration is successful", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ empty: true });
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password");
      (addDoc as jest.Mock).mockResolvedValue({ id: "new-id" });

      const callback = jest.fn();
      await signUp({ email: "new@gmail.com", fullname: "Salsa", password: "123" }, callback);

      expect(callback).toHaveBeenCalledWith({ status: "success", message: "Register sukses" });
    });

    it("should return error if email already exists", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ empty: false });
      const callback = jest.fn();
      await signUp({ email: "exists@gmail.com", fullname: "Salsa", password: "123" }, callback);
      expect(callback).toHaveBeenCalledWith({ status: "error", message: "Email already exists" });
    });

    it("should call catch block when signUp fails", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ empty: true });
      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error("Firebase Fail"));
      const callback = jest.fn();
      await signUp({ email: "error@gmail.com", fullname: "Salsa", password: "123" }, callback);
      expect(callback).toHaveBeenCalledWith({ status: "error", message: "Firebase Fail" });
    });
  });

  // --- 3. TEST loginWithOAuth ---
  describe("loginWithOAuth", () => {
    it("should update user if email already exists", async () => {
      (getDocs as jest.Mock).mockResolvedValue({
        docs: [{ id: "old-id", data: () => ({ role: "member" }) }],
      });
      const callback = jest.fn();
      await loginWithOAuth({ email: "salsa@gmail.com" }, callback);
      expect(updateDoc).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(expect.objectContaining({ status: true }));
    });

    it("should create new user if email does not exist", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ docs: [] });
      const callback = jest.fn();
      await loginWithOAuth({ email: "new@gmail.com" }, callback);
      expect(addDoc).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(expect.objectContaining({ status: true }));
    });

    it("should handle error in catch block", async () => {
      (getDocs as jest.Mock).mockRejectedValue(new Error("Fail"));
      const callback = jest.fn();
      await loginWithOAuth({ email: "error@gmail.com" }, callback);
      expect(callback).toHaveBeenCalledWith({ status: false });
    });
  });

  // --- 4. TEST retrieveProducts ---
  describe("retrieveProducts", () => {
    it("should retrieve all products correctly", async () => {
      const mockProducts = [
        { id: "p1", name: "Product 1" },
        { id: "p2", name: "Product 2" }
      ];
      (getDocs as jest.Mock).mockResolvedValue({
        docs: mockProducts.map(p => ({ id: p.id, data: () => p }))
      });

      const result = await retrieveProducts("products");
      expect(result).toHaveLength(2);
      expect((result[0] as any).name).toBe("Product 1");
    });
  });

  // --- 5. TEST retrieveDataByID ---
  describe("retrieveDataByID", () => {
    it("should retrieve single data by ID", async () => {
      const mockData = { name: "Single Product" };
      
      // Di sini getDoc (tanpa s) digunakan
      (getDoc as jest.Mock).mockResolvedValue({
        data: () => mockData
      });

      const result = await retrieveDataByID("products", "p1");
      expect(result).toEqual(mockData);
    });
  });
});