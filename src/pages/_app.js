import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { VaultProvider } from "../context/VaultContext";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VaultProvider>
          <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100 transition-colors">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-8">
              <Component {...pageProps} />
            </main>
          </div>
        </VaultProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
