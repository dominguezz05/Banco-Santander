import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import ProductShowcase from "@/components/sections/product-showcase";
import NewsSection from "@/components/sections/news-section";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <ProductShowcase />
          <NewsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
