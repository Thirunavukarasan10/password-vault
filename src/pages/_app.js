import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { VaultProvider } from "../context/VaultContext";

function MyApp({ Component, pageProps }) {
  return (
    <VaultProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Component {...pageProps} />
        </main>
      </div>
    </VaultProvider>
  );
}

export default MyApp;
