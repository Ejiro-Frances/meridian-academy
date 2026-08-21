import { z } from "zod";

const pinSchema = z.object({
  n: z.number().int().min(1).max(9),
  name: z.string().min(1),
  icon: z.string().min(1),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  body: z.string().min(1),
});

export type MapPin = z.infer<typeof pinSchema>;

export const mapPins: MapPin[] = z
  .array(pinSchema)
  .length(9)
  .parse([
    {
      n: 1,
      name: "Main gate & security",
      icon: "shield-check",
      x: 8,
      y: 78,
      body: "Signed-in visitors are walked up by a prefect. Gates close at 7:40 am for morning assembly.",
    },
    {
      n: 2,
      name: "Administration block",
      icon: "building-2",
      x: 22,
      y: 62,
      body: "Principal, both vice principals, bursary and admissions. Open 7:30 am – 4:00 pm on school days.",
    },
    {
      n: 3,
      name: "Block B · junior & science",
      icon: "flask-conical",
      x: 40,
      y: 40,
      body: "JSS classrooms on both floors, with the Physics and Chemistry laboratories at the east end.",
    },
    {
      n: 4,
      name: "Block C · senior wing",
      icon: "microscope",
      x: 58,
      y: 34,
      body: "SS 1 and SS 2 classrooms, the Biology laboratory, exams office and counselling suite.",
    },
    {
      n: 5,
      name: "Block D & library",
      icon: "library",
      x: 74,
      y: 46,
      body: "SS 3 classrooms, the ICT suite, UTME lab and a 4,000-title library open until 5:00 pm.",
    },
    {
      n: 6,
      name: "Assembly hall",
      icon: "megaphone",
      x: 46,
      y: 66,
      body: "Seats 900. Monday assembly, inter-house debates, and the annual prize-giving in July.",
    },
    {
      n: 7,
      name: "Sports field & courts",
      icon: "dumbbell",
      x: 30,
      y: 20,
      body: "A full-size pitch, two basketball courts and a 200 m track. Games are timetabled twice a week.",
    },
    {
      n: 8,
      name: "Boarding houses",
      icon: "bed-double",
      x: 82,
      y: 72,
      body: "Four houses — Ìrókò, Ọ̀ṣun, Grove and Àpáta — 46 students each with a resident house parent.",
    },
    {
      n: 9,
      name: "Clinic & farm plot",
      icon: "stethoscope",
      x: 64,
      y: 84,
      body: "A resident nurse on duty during school hours, next to the two-hectare agricultural science plot.",
    },
  ]);
