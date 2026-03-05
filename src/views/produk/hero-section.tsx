import styles from "./produk.module.css";

interface HeroProps {
  onRefresh: () => void; // Menerima fungsi refresh dari parent
  loading: boolean;      // Menerima status loading
}

const HeroSection = ({ onRefresh, loading }: HeroProps) => {
  return (
    <section className={styles.hero}>
      <h1 className={`${styles.heroTitle} text-5xl tracking-tight`}>
        Promo Spesial Bulan Ini!
      </h1>
      <p className="mt-4 text-xl opacity-80">
        Temukan produk impian Anda dengan penawaran terbaik.
      </p>
      
      {/* TUGAS 3: Tombol Refresh Data */}
      <button 
        onClick={onRefresh}
        disabled={loading}
        className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 flex items-center gap-2"
      >
        {loading ? (
          <span>Memuat Data...</span>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </>
        )}
      </button>
    </section>
  );
};

export default HeroSection;