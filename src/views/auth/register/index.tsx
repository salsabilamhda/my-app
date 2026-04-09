import Link from "next/link";
import style from "./register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Reset error setiap kali submit
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const fullname = formData.get("Fullname") as string;
    const password = formData.get("Password") as string;

    // --- VALIDASI TUGAS (Poin 2) ---
    if (!email) {
      setError("Email wajib diisi");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullname, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      } else {
        setIsLoading(false);
        // Menampilkan pesan error dari backend (misal: "Email sudah ada")
        setError(result.name || "Terjadi kesalahan");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Gagal terhubung ke server");
    }
  };

  return (
    <div className={style.register}>
      {/* Menampilkan pesan error di UI (Tugas Poin 4) */}
      {error && <p className={style.register__error}>{error}</p>}
      
      <h1 className={style.register__title}>Halaman Register</h1>
      <div className={style.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.register__form__item}>
            <label htmlFor="email" className={style.register__form__item__label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label htmlFor="Fullname" className={style.register__form__item__label}>Fullname</label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label htmlFor="Password" className={style.register__form__item__label}>Password</label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              className={style.register__form__item__input}
            />
          </div>

          <button 
            type="submit" 
            className={style.register__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <br />
        <p className={style.register__form__item__text}>
          Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;