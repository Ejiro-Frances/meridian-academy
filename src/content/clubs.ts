import { z } from "zod";

const clubSchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
  body: z.string().min(1),
  img: z.string().startsWith("/img/"),
  alt: z.string().min(1),
});

export type Club = z.infer<typeof clubSchema>;

export const clubs: Club[] = z
  .array(clubSchema)
  .length(4)
  .parse([
    {
      name: "Robotics & coding",
      icon: "cpu",
      body: "Builds the line-follower that won Oyo State last March.",
      img: "/img/ir-c1.png",
      alt: "Illustration of a line-following robot and a gear",
    },
    {
      name: "Debate & literary",
      icon: "megaphone",
      body: "Fridays in the hall. Four inter-school fixtures a term.",
      img: "/img/ir-c2.png",
      alt: "Illustration of a speaker at a podium between speech bubbles",
    },
    {
      name: "Farm & environment",
      icon: "sprout",
      body: "Runs the two-hectare plot behind the clinic.",
      img: "/img/ir-c3.png",
      alt: "Illustration of crop rows on the school farm plot",
    },
    {
      name: "Academy voices",
      icon: "music",
      body: "Choir and drumline. Opens every assembly.",
      img: "/img/ir-c4.png",
      alt: "Illustration of a drum, drumsticks and musical notes",
    },
  ]);
