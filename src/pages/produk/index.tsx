import TampilanProduk from "@/views/produk"; // Sesuaikan path jika berbeda
import useSWR from "swr";
// Pastikan kamu sudah membuat file fetcher.ts sesuai dengan gambar yang kamu unggah di awal
import fetcher from "../utils/swr/fetcher"; 

const Kategori = () => {
  // REFACTOR: Menghapus useState dan useEffect, diganti dengan 1 baris useSWR
  // SWR otomatis menyediakan state 'data', 'error', dan 'isLoading'
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  // Menangani tampilan jika terjadi error pada API
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        Terjadi kesalahan saat memuat data produk.
      </div>
    );
  }

  return (
    <div>
      {/* 1. Kirim 'isLoading' bawaan dari SWR untuk memicu animasi Skeleton.
        2. Gunakan optional chaining (data?.data) agar tidak error saat data masih undefined/proses fetch.
           Jika data?.data kosong/undefined, kirim array kosong [].
      */}
      <TampilanProduk 
        isLoading={isLoading} 
        products={data?.data || []} 
      />
    </div>
  );
};

export default Kategori;