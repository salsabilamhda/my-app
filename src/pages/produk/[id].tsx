import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";

const HalamanProduk = ({ product }: { product: ProductType }) => {
  // Digunakan jika ingin menggunakan client-side rendering (SWR)
  // const { query } = useRouter();
  // const { data, error } = useSWR(query.id ? `/api/produk/${query.id}` : null, fetcher);

  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProduk;

// --- STRATEGI STATIC SITE GENERATION (SSG) ---

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/products');
  const response = await res.json();

  // Menggunakan 'id' sesuai dengan nama file [id].tsx
  const paths = response.data.map((product: ProductType) => ({
    params: { id: product.id.toString() } 
  }));

  return {
    paths,
    fallback: false // atau 'blocking' jika data bisa bertambah di runtime
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/produk/${params.id}`);
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
    // revalidate: 10, // opsional: update data setiap 10 detik tanpa build ulang
  };
}

// --- ALTERNATIF: SERVER SIDE RENDERING (SSR) ---
/*
export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/produk/${params.id}`);
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
}
*/