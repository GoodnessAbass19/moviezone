import { Suspense } from "react";
import Navbar from "../components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Loading from "./loading";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer";

// import { Mr_Dafoe } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movies Zone",
  description: "Created By GoodnessDev",
  tags: ["nextjs", "#movieszone", "moviestrailer", "tmdbapi"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`{inter.className}`}>
        <Provider>
          <Navbar />
          <Suspense fallback={<Loading />}>
            <div className="pt-20">{children}</div>
          </Suspense>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
