import TampilanProduk from "@/views/produk/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HalamanProduk = () => {
  // 1. Inisialisasi State
  const [isLogin, setIsLogin] = useState(true); 
  const [products, setProducts] = useState([]);
  const { push } = useRouter();

  // 2. Proteksi Login (Redirect jika tidak login)
  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, [isLogin, push]);

  // 3. Mengambil Data dari API
  useEffect(() => {
    if (isLogin) {
      fetch("/api/produk")
        .then((response) => response.json())
        .then((responsedata) => {
          // Pastikan mengambil properti 'data' dari API
          setProducts(responsedata.data || []);
        })
        .catch((error) => {
          console.error("Error fetching produk:", error);
        });
    }
  }, [isLogin]);

  // Cegah render jika belum login
  if (!isLogin) return null;

  // 4. Kirim data 'products' ke komponen TampilanProduk
  return (
    <div>
      <TampilanProduk products={products} />
    </div>
  );
};

export default HalamanProduk;