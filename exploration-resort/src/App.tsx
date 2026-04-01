import { BookingBar } from "./components/BookingBar";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { RoomGrid } from "./components/RoomGrid";
import { Testimonials } from "./components/Testimonials";

export default function App() {
  return (
    <div className="min-h-screen bg-sand">
      <Header />
      <main>
        <Hero />
        <BookingBar />
        <RoomGrid />
        <Testimonials />
      </main>
      <footer className="border-t border-ocean/10 bg-ocean-deep px-5 py-16 text-sand md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold tracking-[0.15em]">Exploration</p>
            <p className="mt-3 max-w-xs font-sans text-sm text-sand/70">
              A private beach on an unnamed latitude. Reservations by inquiry
              only.
            </p>
          </div>
          <div className="flex flex-col gap-2 font-sans text-sm text-sand/75">
            <span>concierge@exploration.resort</span>
            <span>+1 (555) 014-2200</span>
          </div>
        </div>
        <p className="mx-auto mt-14 max-w-6xl font-sans text-xs text-sand/45">
          © {new Date().getFullYear()} Exploration. Imagery for demonstration.
        </p>
      </footer>
    </div>
  );
}
