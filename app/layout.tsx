import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { store } from "@/lib/config";

export const metadata = {
  title: store.name,
  description: "Simple digital kits. Clear prices. A loyalty card that ordinary people can read.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
