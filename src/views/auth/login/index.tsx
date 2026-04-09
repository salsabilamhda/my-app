import Link from "next/link";
import style from "../../auth/login/login.module.scss"; // Sesuaikan path sesuai gambar
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react"; // Penambahan import signIn

const Tampilanlogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter(); // Tambahkan query untuk callbackUrl

  const callbackUrl: any = query.callbackUrl || "/"; // Definisi callbackUrl sesuai gambar
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Menggunakan signIn dari next-auth sebagai pengganti fetch manual ke API login
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res?.error || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };

  return (
    <div className={style.login}>
      {error && <p className={style.login__error}>{error}</p>}
      
      <h1 className={style.login__title}>Halaman login</h1>
      <div className={style.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.login__form__item}>
            <label htmlFor="email" className={style.login__form__item__label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.login__form__item__input}
            />
          </div>

          <div className={style.login__form__item}>
            <label htmlFor="Password" className={style.login__form__item__label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={style.login__form__item__input}
            />
          </div>

          <button 
            type="submit" 
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "login"}
          </button>
        </form>

        <br />
        <p className={style.login_form__item_text}>
          tidak punya {""} akun? <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Tampilanlogin;