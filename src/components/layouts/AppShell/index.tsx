import { useRouter } from "next/router";
import Navbar from "../navbar";
// 1. Import font Roboto dari next/font/google
import { Roboto } from "next/font/google";

const disableNavbar = ['/auth/login', '/auth/register', '/404'];

// 2. Konfigurasi font Roboto
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"]
});

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();

    return (
        /* 3. Terapkan roboto.className pada tag main */
        <main className={roboto.className}>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    );
};

export default AppShell;