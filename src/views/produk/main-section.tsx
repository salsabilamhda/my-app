import styles from "./produk.module.css";
import { ProductType } from "./index_duplicate";

interface MainSectionProps {
  productId: string | string[] | undefined;
  products: ProductType[];
}

const MainSection = ({ productId, products }: MainSectionProps) => {
  return (
    <section className={styles.mainCard}>
      <div className={`${styles.badge} tracking-widest uppercase`}>Katalog Produk</div>
      
      <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Daftar Produk</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {products.map((product) => (
          <div key={product.id} className="p-6 border rounded-xl bg-white shadow-sm">
            {/* TUGAS 2: Menampilkan Category dengan styling badge biru */}
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-md uppercase">
              {product.category || "Tanpa Kategori"}
            </span>
            
            <h3 className="font-bold text-xl mt-2 text-slate-800">{product.name}</h3>
            <p className="text-slate-600">Harga: Rp {product.price?.toLocaleString()}</p>
            <p className="text-slate-500 text-sm">Ukuran: {product.size}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-600">
        <p className="text-slate-400 text-xs font-bold uppercase">ID Produk Aktif (URL):</p>
        <p className="text-lg font-mono text-blue-800">{productId || "N/A"}</p>
      </div>
    </section>
  );
};

export default MainSection;