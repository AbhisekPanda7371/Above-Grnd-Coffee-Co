import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import MenuShowcase from "@/components/MenuShowcase";
import Reserve from "@/components/Reserve";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Featured />
      <MenuShowcase />
      <Reserve />
      <Footer />
    </main>
  );
}
