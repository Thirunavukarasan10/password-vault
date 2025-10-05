import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { VaultProvider } from "../context/VaultContext";
import { ThemeProvider } from "../context/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <VaultProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 py-8">
            <Component {...pageProps} />
          </main>
        </div>
      </VaultProvider>
    </ThemeProvider>
  );
}

export default MyApp;
