import { useInView } from "../hooks/useInView";

export function Hero() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="stay"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85"
          alt="Calm tropical shoreline and turquoise water"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean/50 to-ocean-deep/90" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-40">
        <p
          className={`mb-4 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-sand/80 transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Beach resort · Private coast
        </p>
        <h1
          className={`font-display text-5xl font-semibold leading-[1.05] tracking-tight text-sand text-balance md:text-7xl lg:text-8xl transition-all duration-1000 delay-100 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Arrive by tide.
          <span className="mt-2 block italic font-medium text-sand/95">
            Leave by choice.
          </span>
        </h1>
        <p
          className={`mt-8 max-w-xl font-sans text-lg leading-relaxed text-sand/85 md:text-xl transition-all duration-1000 delay-200 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Exploration is a quiet line between sea and sky—rooms shaped by light,
          service measured in presence, and mornings that begin before words.
        </p>
        <div
          className={`mt-12 flex flex-wrap gap-4 transition-all duration-1000 delay-300 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <a
            href="#rooms"
            className="inline-flex items-center justify-center rounded-full bg-sand px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ocean shadow-lg shadow-black/20 transition hover:bg-white"
          >
            View rooms
          </a>
          <a
            href="#stories"
            className="inline-flex items-center justify-center rounded-full border border-sand/50 px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-sand transition hover:bg-sand/10"
          >
            Guest stories
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        aria-hidden
      >
        <div className="h-12 w-px animate-pulse bg-gradient-to-b from-transparent via-sand/60 to-transparent" />
      </div>
    </section>
  );
}
