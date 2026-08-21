import { z } from "zod";

const leaderSchema = z.object({
  role: z.string().min(1),
  icon: z.string().min(1),
  hue: z.string().min(1), // eyebrow color on the navy band
  name: z.string().min(1),
  bio: z.string().min(1),
  contact: z.string().email(),
  img: z.string().startsWith("/img/"),
  alt: z.string().min(1),
});

export type Leader = z.infer<typeof leaderSchema>;

export const leaders: Leader[] = z
  .array(leaderSchema)
  .length(3)
  .parse([
    {
      role: "Principal",
      icon: "award",
      hue: "var(--color-clay-200)",
      name: "Dr Adenike Ọ̀ṣúnládé",
      bio: "Twenty-two years in secondary education, eleven of them here. Teaches one SS 3 Chemistry set every session — on purpose.",
      contact: "principal@meridianacademy.edu.ng",
      img: "/img/ir-l1.png",
      alt: "Stylized portrait illustration of the principal",
    },
    {
      role: "Vice principal · academics",
      icon: "book-open",
      hue: "var(--color-teal-200)",
      name: "Mr Ikechukwu Maduka",
      bio: "Owns the timetable, the streams and the exam calendar. If a question is about WAEC, BECE or subject choice, it lands on his desk.",
      contact: "academics@meridianacademy.edu.ng",
      img: "/img/ir-l2.png",
      alt: "Stylized portrait illustration of the vice principal for academics",
    },
    {
      role: "Vice principal · administration",
      icon: "clipboard-check",
      hue: "var(--color-clay-200)",
      name: "Mrs Halimat Adebowale",
      bio: "Boarding, buses, fees and welfare. She answers the parents’ line herself between 8:00 and 10:00 every morning.",
      contact: "admin@meridianacademy.edu.ng",
      img: "/img/ir-l3.png",
      alt: "Stylized portrait illustration of the vice principal for administration",
    },
  ]);
