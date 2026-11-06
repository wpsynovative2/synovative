/**
 * Slides for the "Meet the crew" character showcase on the About page.
 *
 * Each slide is a papercraft caricature standing in front of an oversized
 * first name. The figure must be a cut-out with a transparent background so
 * the name can sit behind it — see `public/images/team-cutouts/`.
 *
 * Adding someone: drop a transparent PNG/WebP cut-out into that folder, then
 * add an entry here. `width`/`height` are the image's pixel size (used for
 * the aspect ratio only). Colours are any CSS colour.
 */
export interface CrewSlide {
  id: string;
  /** Oversized word behind the figure — usually the first name. */
  word: string;
  name: string;
  role: string;
  image: string;
  width: number;
  height: number;
  /** Section background while this slide is active. */
  background: string;
  /** Colour of the oversized word — a pale tint of the background. */
  wordColor: string;
}

export const crewSlides: CrewSlide[] = [
  {
    id: "vipul-chalke",
    word: "Vipul",
    name: "Vipul Chalke",
    role: "Sr. Graphic Designer",
    image: "/images/team-cutouts/vipul-chalke.webp",
    width: 463,
    height: 1000,
    background: "#ffa41d",
    wordColor: "#ffd09e",
  },
  {
    id: "nishant-jadhav",
    word: "Nishant",
    name: "Nishant Jadhav",
    role: "Sr. Video Editor",
    image: "/images/team-cutouts/nishant-jadhav.webp",
    width: 605,
    height: 1018,
    background: "#5e478b",
    wordColor: "#b2aac5",
  },
];
