import { z } from "zod";

import { largestArm, totalArms, totalStudents } from "@/content/levels";
import { totalTeachingStaff } from "@/content/staff";

export const hero = {
  badge: "A secondary school that sets the pace",
  headline: ["Deep roots.", "High reach."],
  lede: `Six years, ${totalArms === 22 ? "twenty-two" : totalArms} class arms, six hundred students — and a science block parents can walk through before they ever step on campus. Meridian Academy teaches JSS 1 to SS 3 on nine hectares above the Ọ̀ṣun valley.`,
  ratio: { figure: "1:16", label: "teacher ratio in practicals" },
  image: {
    src: "/img/ir-hero.png",
    alt: "Illustration of the Meridian Academy campus at dusk — placeholder until real photography",
  },
};

// Stat figures are derived from the content tables so they can never drift
// from the data shown elsewhere on the site.
export const heroStats = [
  { n: String(totalStudents), l: "students across six years", icon: "users" },
  { n: String(totalArms), l: `class arms, none over ${largestArm}`, icon: "layout-grid" },
  { n: String(totalTeachingStaff), l: "teaching staff in 3 staff rooms", icon: "user-round-check" },
  { n: "3", l: "laboratories you can tour in 3D", icon: "microscope" },
];

const pillarSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  cta: z.string().min(1),
  href: z.string().startsWith("/"),
  img: z.string().startsWith("/img/"),
  alt: z.string().min(1),
});

export type Pillar = z.infer<typeof pillarSchema>;

export const pillars: Pillar[] = z
  .array(pillarSchema)
  .length(3)
  .parse([
    {
      icon: "microscope",
      title: "Three real laboratories",
      body: "Physics, Chemistry and Biology, each with a full-time technician. Senior science arms get three practicals a week — not one.",
      cta: "Tour them in 3D",
      href: "/campus",
      img: "/img/ir-p1.png",
      alt: "Illustration of a laboratory bench with flasks and equipment",
    },
    {
      icon: "users",
      title: "Nobody sits at the back",
      body: "Arms are capped at 31 and fall to 25 by SS 3, with a form teacher and an assistant who stay with the class all year.",
      cta: "See every arm",
      href: "/academics",
      img: "/img/ir-p2.png",
      alt: "Illustration of a classroom with desks and a chalkboard",
    },
    {
      icon: "trees",
      title: "Nine hectares to grow into",
      body: "A full-size pitch, a two-hectare farm plot, four boarding houses and a library that stays open until five.",
      cta: "Walk the campus map",
      href: "/campus",
      img: "/img/ir-p3.png",
      alt: "Illustration of the school grounds with trees and a footpath",
    },
  ]);

const eventSchema = z.object({
  d: z.string().min(1),
  m: z.string().min(1),
  icon: z.string().min(1),
  t: z.string().min(1),
  b: z.string().min(1),
});

export type TermEvent = z.infer<typeof eventSchema>;

export const termDiary = {
  eyebrow: "Term diary",
  heading: "What's happening on campus",
  lede: "Third term runs to 24 July. Everything below is open to parents unless marked otherwise.",
  cta: "Reserve an open-day slot",
  events: z
    .array(eventSchema)
    .length(3)
    .parse([
      {
        d: "12",
        m: "Sep",
        icon: "door-open",
        t: "Open morning · JSS 1 & SS 1 entry",
        b: "Sit in a lesson, meet a form teacher, tour the labs.",
      },
      {
        d: "26",
        m: "Sep",
        icon: "flask-conical",
        t: "Inter-house science fair",
        b: "SS 2 project defence in the assembly hall, 10:00 am.",
      },
      {
        d: "09",
        m: "Oct",
        icon: "users",
        t: "BECE parents’ briefing",
        b: "JSS 3 stream counselling opens. Attendance expected.",
      },
    ]),
};
