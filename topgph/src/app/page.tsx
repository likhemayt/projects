import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Partners } from "@/components/sections/Partners";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { getPosts } from "@/lib/wordpress";

export default async function HomePage() {
  let posts = [];
  let errorMsg = null;
  try {
    posts = await getPosts(3);
  } catch (error) {
    console.error("Failed to fetch WordPress posts:", error);
    errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />

      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <About />
        <Projects />
        <Partners />
        
        {errorMsg ? (
          <section className="py-24 text-center">
            <h2 className="text-destructive font-bold text-2xl">Vercel Build Error:</h2>
            <p className="text-gray-400 mt-4">{errorMsg}</p>
          </section>
        ) : (
          <News posts={posts} />
        )}
        
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
