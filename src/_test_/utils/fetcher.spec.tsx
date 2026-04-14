import fetcher from "@/utils/swr/fetcher";

describe("Fetcher Utility", () => {
  // 1. Bersihkan mock setelah setiap test selesai
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return data when fetch is successful", async () => {
    // Mock data yang diharapkan
    const mockData = { data: [{ id: 1, name: "Product Test" }] };

    // 2. Mock fungsi fetch global
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await fetcher("/api/produk");

    // Ekspektasi: fetch dipanggil dengan URL yang benar
    expect(global.fetch).toHaveBeenCalledWith("/api/produk");
    // Ekspektasi: hasil sesuai dengan mockData
    expect(result).toEqual(mockData);
  });

  it("should throw an error when fetch fails", async () => {
    // 3. Simulasi fetch gagal (Network Error)
    global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

    await expect(fetcher("/api/produk")).rejects.toThrow("Network Error");
  });

  it("should handle empty response correctly", async () => {
    const mockEmpty = {};
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockEmpty),
    });

    const result = await fetcher("/api/produk");
    expect(result).toEqual({});
  });
});