import type { CSSProperties } from "react";
import type { Room } from "../data/rooms";

type Props = {
  room: Room;
  visible: boolean;
  style?: CSSProperties;
};

export function RoomCard({ room, visible, style }: Props) {
  return (
    <article
      style={style}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-ocean/10 bg-white shadow-lg shadow-ocean/5 transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 via-transparent to-transparent opacity-80" />
        <p className="absolute bottom-4 left-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-sand/90">
          From ${room.pricePerNight} / night
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div>
          <h3 className="font-display text-2xl font-semibold text-ocean md:text-3xl">
            {room.name}
          </h3>
          <p className="mt-1 font-sans text-sm italic text-ocean/65">{room.tagline}</p>
        </div>
        <p className="font-sans text-sm text-ocean/75">
          {room.sizeSqM} m² · Up to {room.maxGuests} guests
        </p>
        <ul className="flex flex-wrap gap-2">
          {room.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-ocean/15 bg-sand/60 px-3 py-1 font-sans text-xs font-medium text-ocean/85"
            >
              {h}
            </li>
          ))}
        </ul>
        <a
          href="#book"
          className="mt-auto inline-flex w-fit items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-ocean underline-offset-4 transition hover:underline"
        >
          Request this room
          <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}
