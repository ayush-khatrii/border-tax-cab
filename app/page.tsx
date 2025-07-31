import Book from "@/components/Book";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero"
import { StickyBanner } from "@/components/ui/sticky-banner";

const page = () => {
  return (
    <section>
      <Hero />
      <Book />
    </section>
  )
}

export default page;