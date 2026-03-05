import TampilanProduk from "@/views/produk/index_duplicate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HalamanDetailProduk = () => {
  // Simulasi status login (true jika sudah login)
  const [isLogin, setIsLogin] = useState(true); 
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, [isLogin, push]);

  if (!isLogin) return null; // Mencegah konten berkedip sebelum redirect

  return <TampilanProduk />;
};

export default HalamanDetailProduk;