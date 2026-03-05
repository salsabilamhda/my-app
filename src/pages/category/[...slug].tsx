import { useRouter } from "next/router";

const CategoryPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Kategori</h1>
      <p>Berikut adalah parameter URL yang Anda akses:</p>
      
      {/* Memeriksa apakah query.slug ada dan merupakan sebuah array */}
      {query.slug && Array.isArray(query.slug) ? (
        <ul>
          {/* Melakukan perulangan (map) pada array slug untuk membuat list */}
          {query.slug.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Parameter tidak ditemukan atau sedang memuat...</p>
      )}
    </div>
  );
};

export default CategoryPage;