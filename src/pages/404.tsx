import Link from "next/link";
import styles from "@/styles/404.module.scss"; //

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <img 
        src="/page-not-found.png" 
        alt="404" 
        className={styles.error__image} 
      /> {/* */}
      
      <h1>404 - Halaman Tidak Ditemukan</h1> {/* */}
      <p>Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p> {/* */}
      
      {/* Tugas 3: Navigasi Kembali ke Home */}
      <Link href="/" className={styles.error__button}>
        Kembali ke Home
      </Link>
    </div>
  );
};

export default Custom404; //