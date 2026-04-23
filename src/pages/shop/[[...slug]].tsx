import { useRouter } from "next/router";

const HalamanToko = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Toko</h1>
      
      {/* Validasi untuk menampilkan kategori utama (index 0) */}
      <p>
        Kategori: {query.slug ? query.slug[0] : "Semua Kategori"}
      </p>

      {/* Opsional: Jika Anda tetap ingin menampilkan seluruh slug yang digabung */}
      <p>
        URL Path: {query.slug ? (Array.isArray(query.slug) ? query.slug.join("-") : query.slug) : "Path kosong"}
      </p>
    </div>
  );
};

export default HalamanToko;