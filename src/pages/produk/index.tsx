import TampilanProduk from "@/views/produk"; 
import useSWR from "swr";
// Pastikan path fetcher sudah benar
import fetcher from "../../utils/swr/fetcher"; 

const Kategori = () => {
  // Mengambil data dari API menggunakan SWR
  const { data, error } = useSWR("/api/produk", fetcher);

  // Menangani tampilan jika terjadi error
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        Terjadi kesalahan saat memuat data produk.
      </div>
    );
  }

  return (
    <div>
      {/* Karena TampilanProduk yang kita buat sebelumnya mengecek 
          'products.length > 0' untuk menampilkan data, 
          kita cukup mengirimkan array kosong [] saat data belum ada (loading).
          Ini akan otomatis memicu kondisi 'else' (skeleton) di TampilanProduk.
      */}
      <TampilanProduk 
        products={data?.data || []} 
      />
    </div>
  );
};

export default Kategori;