import { ProductType } from "../../types/Product.type";
import styles from "../DetailProduct/detailProduct.module.scss";
import Image from "next/image";
// 1. Import font Montserrat dari next/font/google
import { Montserrat } from "next/font/google";

// 2. Konfigurasi font Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800"], // 800 untuk mainTitle, 700 untuk nama produk
});

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    /* 3. Terapkan montserrat.className pada container utama */
    <div className={`${styles.container} ${montserrat.className}`}>
      <h1 className={styles.mainTitle}>Detail Produk</h1>
      
      <div className={styles.produkdetail}>
        <div className={styles.produkdetail__image}>
          <Image 
            src={products.image || "/placeholder.png"} 
            alt={products.name || "Gambar Produk"}
            width={500}
            height={500} 
            priority
            className={styles.produkdetail__image__img}
          />
        </div>

        <div className={styles.produkdetail__info}>
          <h1 className={styles.produkdetail__name}>{products.name}</h1>
          <p className={styles.produkdetail__category}>{products.category}</p>
          <p className={styles.produkdetail__price}>
            {products.price && 
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(products.price)
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;