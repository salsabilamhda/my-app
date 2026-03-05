import styles from "@/pages/produk/product.module.scss";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({
  products,
  isLoading,
}: {
  products: ProductType[];
  isLoading?: boolean;
}) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles["produk__title"]}>Daftar Produk</h1>
      <div className={styles["produk__content"]}>
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <div key={index} className={styles["produk__content__skeleton"]}>
              <div className={styles["produk__content__skeleton__image"]}></div>
              <div className={styles["produk__content__skeleton__details"]}>
                {/* Urutan Skeleton disesuaikan: Name > Category > Price */}
                <div className={`${styles["produk__content__skeleton__line"]} ${styles["produk__content__skeleton__line--medium"]}`}></div>
                <div className={`${styles["produk__content__skeleton__line"]} ${styles["produk__content__skeleton__line--short"]}`}></div>
                <div className={`${styles["produk__content__skeleton__line"]} ${styles["produk__content__skeleton__line--long"]}`}></div>
              </div>
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product: ProductType) => (
            <div key={product.id} className={styles["produk__content__item"]}>
              <div className={styles["produk__content__item__imageWrapper"]}>
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              
              <div className={styles["produk__content__item__details"]}>
                {/* 1. Name (Bold) */}
                <h4 className={styles["produk__content__item__name"]}>
                  {product.name}
                </h4>
                
                {/* 2. Category (Biasa) */}
                <p className={styles["produk__content__item__category"]}>
                  {product.category}
                </p>
                
                {/* 3. Price */}
                <p className={styles["produk__content__item__price"]}>
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666" }}>
            Belum ada produk yang tersedia saat ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;