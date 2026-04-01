import { useInView } from "../hooks/useInView";

const quotes = [
  {
    text: "The silence here is intentional. We slept with the doors open and woke to the same shade of blue twice.",
    name: "Elena V.",
    place: "Lisbon",
  },
  {
    text: "Service without performance—just calm, precise care. The cliff residence rewired how I think about a view.",
    name: "Marcus T.",
    place: "Singapore",
  },
  {
    text: "Exploration doesn’t shout luxury. It lets the tide do the talking.",
    name: "Amira K.",
    place: "Dubai",
  },
];

export function Testimonials() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="stories"
      ref={ref}
      className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mb-14 md:mb-20">
        <p
          className={`font-sans text-xs font-semibold uppercase tracking-[0.35em] text-ocean/60 transition-all duration-700 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          Voices
        </p>
        <h2
          className={`mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-ocean md:text-5xl transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Stories from the shoreline
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {quotes.map((q, i) => (
          <blockquote
            key={q.name}
            className={`flex flex-col justify-between border-t border-ocean/15 pt-8 transition-all duration-700 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: isInView ? `${150 + i * 120}ms` : "0ms" }}
          >
            <p className="font-display text-xl font-medium leading-relaxed text-ocean md:text-[1.35rem]">
              “{q.text}”
            </p>
            <footer className="mt-8 font-sans text-sm text-ocean/65">
              <cite className="not-italic font-semibold text-ocean">{q.name}</cite>
              <span className="text-ocean/50"> · {q.place}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
