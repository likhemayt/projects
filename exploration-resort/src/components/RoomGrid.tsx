import { useInView } from "../hooks/useInView";
import { rooms } from "../data/rooms";
import { RoomCard } from "./RoomCard";

export function RoomGrid() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="rooms"
      ref={ref}
      className="scroll-mt-28 bg-sand-muted/50 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={`font-sans text-xs font-semibold uppercase tracking-[0.35em] text-ocean/60 transition-all duration-700 ${
                isInView ? "opacity-100" : "opacity-0"
              }`}
            >
              Residences
            </p>
            <h2
              className={`mt-3 font-display text-4xl font-semibold text-ocean md:text-5xl transition-all duration-1000 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Rooms & villas
            </h2>
          </div>
          <p
            className={`max-w-md font-sans text-sm leading-relaxed text-ocean/75 transition-all duration-1000 delay-100 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Each space is a frame for the horizon—natural materials, soft
            contrast, and nothing that competes with the water.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {rooms.map((room, i) => (
            <RoomCard
              key={room.id}
              room={room}
              visible={isInView}
              style={
                isInView ? { transitionDelay: `${200 + i * 100}ms` } : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
