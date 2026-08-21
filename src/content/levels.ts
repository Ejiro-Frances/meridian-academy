import { z } from "zod";

import { teacherNames } from "@/content/staff";
import { subjectPool } from "@/content/subjects";

const levelIds = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"] as const;
export type LevelId = (typeof levelIds)[number];

// Arm sizes run 25–31 school-wide, capped at 27 in SS 3 (checked below).
const armTuple = z.tuple([
  z.string().min(1), // code
  z.string().min(1), // home room
  z.number().int().min(25).max(31), // students
]);

const levelSchema = z.object({
  id: z.enum(levelIds),
  label: z.string().min(1),
  stream: z.enum(["Junior school", "Senior school"]),
  sub: z.string().min(1),
  icon: z.string().min(1),
  blurb: z.string().min(1),
  tags: z.array(z.string().min(1)).length(4),
  arms: z.array(armTuple).min(3).max(4),
});

export type Level = z.infer<typeof levelSchema>;

const levelsSchema = z
  .array(levelSchema)
  .length(6)
  .refine((ls) => ls.every((l) => l.id !== "SS3" || l.arms.every((a) => a[2] <= 27)), {
    message: "SS 3 arms are capped at 27 students",
  });

export const levels: Level[] = levelsSchema.parse([
  {
    id: "JSS1",
    label: "JSS 1",
    stream: "Junior school",
    sub: "Foundation year",
    icon: "sprout",
    blurb:
      "Three arms of thirty. The year is about settling in: a common core of fourteen subjects, a reading hour every morning, and a form teacher who sees the same thirty faces all year.",
    tags: ["3 arms · 87 students", "14 core subjects", "No streaming yet", "Reading hour daily"],
    arms: [
      ["JSS 1A", "B-101", 30],
      ["JSS 1B", "B-102", 29],
      ["JSS 1C", "B-103", 28],
    ],
  },
  {
    id: "JSS2",
    label: "JSS 2",
    stream: "Junior school",
    sub: "Building year",
    icon: "flask-conical",
    blurb:
      "Laboratory work begins in earnest — basic science moves into the Physics lab for half its periods, and every student picks a first club.",
    tags: [
      "3 arms · 89 students",
      "Lab periods begin",
      "First club choice",
      "Continuous assessment 40%",
    ],
    arms: [
      ["JSS 2A", "B-104", 31],
      ["JSS 2B", "B-201", 30],
      ["JSS 2C", "B-202", 28],
    ],
  },
  {
    id: "JSS3",
    label: "JSS 3",
    stream: "Junior school",
    sub: "BECE year",
    icon: "clipboard-list",
    blurb:
      "The Basic Education Certificate year, and the widest cohort we run — four arms. Stream counselling with parents happens in the second term, before anyone picks Science, Arts or Commercial.",
    tags: ["4 arms · 110 students", "BECE in June", "Stream counselling", "Extra Saturday clinics"],
    arms: [
      ["JSS 3A", "B-203", 29],
      ["JSS 3B", "B-204", 28],
      ["JSS 3C", "C-101", 27],
      ["JSS 3D", "C-102", 26],
    ],
  },
  {
    id: "SS1",
    label: "SS 1",
    stream: "Senior school",
    sub: "Streams begin",
    icon: "git-branch",
    blurb:
      "Streaming year. Two science arms, one arts, one commercial — each with ten subjects and a subject teacher per discipline rather than a generalist.",
    tags: [
      "4 arms · 112 students",
      "Science ×2, Arts, Commercial",
      "10 subjects each",
      "Lab safety certification",
    ],
    arms: [
      ["SS 1 Science A", "C-103", 30],
      ["SS 1 Science B", "C-104", 29],
      ["SS 1 Arts", "C-105", 26],
      ["SS 1 Commercial", "C-201", 27],
    ],
  },
  {
    id: "SS2",
    label: "SS 2",
    stream: "Senior school",
    sub: "Mock & project year",
    icon: "microscope",
    blurb:
      "The heaviest practical load in the school: three lab sessions a week for science arms, a research project for arts and commercial, and the first WAEC mock in March.",
    tags: ["4 arms · 106 students", "3 practicals weekly", "Research project", "March mock"],
    arms: [
      ["SS 2 Science A", "C-202", 28],
      ["SS 2 Science B", "C-203", 27],
      ["SS 2 Arts", "C-204", 25],
      ["SS 2 Commercial", "C-205", 26],
    ],
  },
  {
    id: "SS3",
    label: "SS 3",
    stream: "Senior school",
    sub: "WAEC & UTME",
    icon: "graduation-cap",
    blurb:
      "Final year, smallest arms by design — twenty-five to twenty-seven, so every candidate gets one-to-one time before WAEC and UTME. Classes finish by the first week of June.",
    tags: ["4 arms · 103 students", "WAEC & UTME", "Arms capped at 27", "University counselling"],
    arms: [
      ["SS 3 Science A", "D-101", 27],
      ["SS 3 Science B", "D-102", 26],
      ["SS 3 Arts", "D-103", 25],
      ["SS 3 Commercial", "D-104", 25],
    ],
  },
]);

export type Arm = {
  levelId: LevelId;
  code: string;
  room: string;
  size: number;
  stream: Level["stream"];
  sub: string;
  form: string;
  assist: string;
  formSubject: string;
  assistSubject: string;
};

/** Teachers are assigned deterministically by index — replace with real staffing data. */
export const allArms: Arm[] = levels.flatMap((level) =>
  level.arms.map((a, idx) => {
    const i = levels.slice(0, levels.indexOf(level)).reduce((n, l) => n + l.arms.length, 0) + idx;
    return {
      levelId: level.id,
      code: a[0],
      room: a[1],
      size: a[2],
      stream: level.stream,
      sub: level.sub,
      form: teacherNames[(i * 2) % teacherNames.length],
      assist: teacherNames[(i * 2 + 1) % teacherNames.length],
      formSubject: subjectPool[(i * 3) % subjectPool.length],
      assistSubject: subjectPool[(i * 3 + 5) % subjectPool.length],
    };
  }),
);

export const roomToArm: Record<string, Arm> = Object.fromEntries(allArms.map((a) => [a.room, a]));

export const totalStudents = allArms.reduce((n, a) => n + a.size, 0);
export const totalArms = allArms.length;
export const largestArm = Math.max(...allArms.map((a) => a.size));

export function armsForLevel(levelId: LevelId): Arm[] {
  return allArms.filter((a) => a.levelId === levelId);
}

export function levelById(id: string): Level {
  return levels.find((l) => l.id === id) ?? levels[0];
}
