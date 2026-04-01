export type Room = {
  id: string;
  name: string;
  tagline: string;
  pricePerNight: number;
  sizeSqM: number;
  maxGuests: number;
  image: string;
  highlights: string[];
};

export const rooms: Room[] = [
  {
    id: "lagoon",
    name: "Lagoon Suite",
    tagline: "Private terrace over still water",
    pricePerNight: 620,
    sizeSqM: 72,
    maxGuests: 2,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
    highlights: ["Ocean view", "Outdoor soaking tub", "Butler service"],
  },
  {
    id: "dune",
    name: "Dune Villa",
    tagline: "Sand-level living with a plunge pool",
    pricePerNight: 890,
    sizeSqM: 110,
    maxGuests: 4,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80",
    highlights: ["Heated pool", "Kitchenette", "Sun deck"],
  },
  {
    id: "cliff",
    name: "Cliff Residence",
    tagline: "Elevated panoramas at golden hour",
    pricePerNight: 1240,
    sizeSqM: 165,
    maxGuests: 6,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    highlights: ["Two bedrooms", "Infinity edge", "Chef on request"],
  },
  {
    id: "pavilion",
    name: "Pavilion Loft",
    tagline: "Open-plan calm with linen and light",
    pricePerNight: 480,
    sizeSqM: 55,
    maxGuests: 2,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
    highlights: ["Rain shower", "Lounge area", "Garden access"],
  },
];
