import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./produk.module.css";
import HeroSection from "./hero-section";
import MainSection from "./main-section";

export type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string; 
};

const TampilanProduk = () => {
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  // TUGAS 3: Fungsi Fetch ulang tanpa reload halaman
  const getProducts = () => {
    setIsLoading(true);
    fetch("/api/produk")
      .then((res) => res.json())
      .then((responsedata) => {
        setProducts(responsedata.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts(); // Panggil saat pertama kali render
  }, []);

  return (
    <div className={styles.container}>
      {/* Kirim fungsi refresh dan state loading ke HeroSection */}
      <HeroSection onRefresh={getProducts} loading={isLoading} />
      <MainSection productId={id} products={products} />
    </div>
  );
};

export default TampilanProduk;