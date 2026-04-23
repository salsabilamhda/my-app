import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";

const HalamanProduk = ({ product }: { product: ProductType }) => {
  // Modifikasi sesuai gambar: Mengaktifkan SWR
  const { query } = useRouter();
  const { data, error } = useSWR(
    query.produk ? `/api/produk/${query.produk}` : null,
    fetcher
  );

  return (
    <div>
      {/* Menggunakan data dari SWR (data.data) jika ada, jika tidak pakai props (product) */}
      <DetailProduk products={data ? data.data : product} />
    </div>
  );
};

export default HalamanProduk;

// --- STRATEGI STATIC SITE GENERATION (SSG) ---
// Bagian ini tetap dicomment sesuai instruksi sebelumnya

// // export async function getStaticPaths() { ... }
// // export async function getStaticProps() { ... }


// --- STRATEGI SERVER SIDE RENDERING (SSR) ---
{/digunakan server-side rendering/}
export async function getServerSideProps({ params }: { params: { produk: string } }) {
  const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
  const respone = await res.json();

  return {
    props: {
      product: respone.data,
    },
  };
}