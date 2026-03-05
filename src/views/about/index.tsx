import styles from "./about.module.css";

const AboutView = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>Tentang Kami</h1>
      
      <p className={styles.description}>
        Selamat datang di halaman profil saya. Halaman ini dirancang sebagai bagian dari 
        implementasi praktikum pengembangan aplikasi web menggunakan Next.js untuk 
        menampilkan informasi mahasiswa secara profesional.
      </p>

      <div className={styles.infoCard}>
        <p className={styles.infoItem}>
          <strong>Nama Mahasiswa</strong> : Salsabila Mahda
        </p>
        <p className={styles.infoItem}>
          <strong>NIM</strong> : 2341720257
        </p>
        <p className={styles.infoItem}>
          <strong>Program Studi</strong> : D4 Teknik Informatika
        </p>
      </div>

      <div className={styles.illustrationWrapper}>
        <img 
          src="/about.png" 
          alt="Ilustrasi Profil Mahasiswa" 
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default AboutView;