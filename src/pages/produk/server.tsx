import TampilanProduk from "@/views/produk";
import { ProductType } from "../../types/Product.type";

const halamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        Halaman Produk Server
      </h1>
      <TampilanProduk products={products} />
    </div>
  );
};

export default halamanProdukServer;

// Fungsi getServerSideProps akan dipanggil setiap kali halaman ini diakses, 
// dan akan mengambil data produk dari API sebelum merender halaman.
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const respone = await res.json();
  
  // console.log("Data produk yang diambil dari API:", respone);
  
  return {
    props: {
      products: respone.data || [], // Memberikan nilai default array kosong jika data tidak tersedia
    },
  };
}