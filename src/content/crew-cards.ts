import { crewSlides, type CrewSlide } from "@/content/crew-showcase";

/**
 * Cards for the "Many hats" character carousel on the About page.
 *
 * The same two caricatures appear several times, once per craft they own, so
 * each card pairs a person with one specialty and its own colour. Cut-outs
 * and pixel sizes come from `crewSlides`, so a new cut-out only needs adding
 * there.
 */
export interface CrewCard {
  id: string;
  name: string;
  /** Small label under the name, e.g. "Craft · Brand identity". */
  craft: string;
  image: string;
  width: number;
  height: number;
  /** Two colours for the card's diagonal gradient, light then deep. */
  from: string;
  to: string;
}

function person(id: string): CrewSlide {
  const slide = crewSlides.find((s) => s.id === id);
  if (!slide) throw new Error(`Unknown crew member: ${id}`);
  return slide;
}

const vipul = person("vipul-chalke");
const nishant = person("nishant-jadhav");

function card(who: CrewSlide, craft: string, from: string, to: string): CrewCard {
  return {
    id: `${who.id}-${craft.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: who.word,
    craft,
    image: who.image,
    width: who.width,
    height: who.height,
    from,
    to,
  };
}

export const crewCards: CrewCard[] = [
  card(vipul, "Brand identity", "#ffb547", "#ef7a12"),
  card(nishant, "Walkthrough films", "#8d6fd4", "#4b2f88"),
  card(vipul, "Brochures & print", "#f45c74", "#c11d40"),
  card(nishant, "Drone shoots", "#4a97e6", "#1c4c9c"),
  card(vipul, "Social creatives", "#4fc67d", "#1d7744"),
  card(nishant, "Reels & edits", "#ff835f", "#d6422a"),
];
