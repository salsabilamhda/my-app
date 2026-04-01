import { ProductType } from "../../types/Product.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <div className={styles.container}>
      {/* Menggunakan class mainTitle agar:
         - text-align: center
         - font-weight: 800 (tebal)
         - font-size: 2.5rem (sedikit besar)
      */}
      <h1 className={styles.mainTitle}>Detail Produk</h1>
      
      <div className={styles.produkdetail}>
        <div className={styles.produkdetail__image}>
          <img 
            src={products.image || "/placeholder.png"} 
            alt={products.name || "Gambar Produk"} 
          />
        </div>

        <div className={styles.produkdetail__info}>
          <h1 className={styles.produkdetail__name}>{products.name}</h1>
          <p className={styles.produkdetail__category}>{products.category}</p>
          <p className={styles.produkdetail__price}>
            Rp {products.price && products.price.toLocaleString("id-ID")}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;