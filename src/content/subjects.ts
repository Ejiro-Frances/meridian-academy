import { z } from "zod";

const subjectList = z.array(z.string().min(1)).min(1);

export const streamKeys = ["Science", "Arts", "Commercial"] as const;
export type StreamKey = (typeof streamKeys)[number] | "junior";

/** Full subject pool used to assign teachers deterministically. */
export const subjectPool: string[] = subjectList.parse([
  "Mathematics",
  "English language",
  "Basic science",
  "Basic technology",
  "Social studies",
  "Civic education",
  "Business studies",
  "Agricultural science",
  "Computer studies",
  "Yoruba",
  "French",
  "Fine art",
  "Music",
  "Physical education",
  "Physics",
  "Chemistry",
  "Biology",
  "Further mathematics",
  "Literature in English",
  "Government",
  "Economics",
  "Geography",
  "History",
  "Christian religious studies",
  "Islamic studies",
  "Technical drawing",
  "Financial accounting",
  "Commerce",
]);

export const juniorSubjects: string[] = subjectList.parse([
  "Mathematics",
  "English language",
  "Basic science",
  "Basic technology",
  "Social studies",
  "Civic education",
  "Business studies",
  "Agricultural science",
  "Computer studies",
  "Yoruba",
  "French",
  "Fine art",
  "Music",
  "Physical & health education",
]);

export const streamSubjects: Record<(typeof streamKeys)[number], string[]> = {
  Science: subjectList.parse([
    "Mathematics",
    "English language",
    "Physics",
    "Chemistry",
    "Biology",
    "Further mathematics",
    "Geography",
    "Civic education",
    "Computer studies",
    "Technical drawing",
  ]),
  Arts: subjectList.parse([
    "Mathematics",
    "English language",
    "Literature in English",
    "Government",
    "History",
    "Christian religious studies",
    "Yoruba",
    "French",
    "Civic education",
    "Fine art",
  ]),
  Commercial: subjectList.parse([
    "Mathematics",
    "English language",
    "Economics",
    "Financial accounting",
    "Commerce",
    "Business studies",
    "Government",
    "Civic education",
    "Computer studies",
    "Geography",
  ]),
};

/** An arm's stream is encoded in its code ("SS 2 Science A" → Science). */
export function streamKeyFor(armCode: string): StreamKey {
  if (armCode.includes("Science")) return "Science";
  if (armCode.includes("Arts")) return "Arts";
  if (armCode.includes("Commercial")) return "Commercial";
  return "junior";
}

export function subjectsFor(armCode: string): string[] {
  const key = streamKeyFor(armCode);
  return key === "junior" ? juniorSubjects : streamSubjects[key];
}

const periodSchema = z.tuple([z.string().min(1), z.string().min(1)]);

/** A sample Wednesday timetable per stream. */
export const wednesday: Record<StreamKey, [string, string][]> = z
  .record(z.string(), z.array(periodSchema).length(8))
  .parse({
    junior: [
      ["7:40", "Assembly on the quad"],
      ["8:00", "Mathematics · double"],
      ["9:20", "English language"],
      ["10:00", "Break"],
      ["10:20", "Basic science · Physics lab"],
      ["11:40", "Social studies"],
      ["12:20", "Yoruba"],
      ["13:00", "Lunch & clubs"],
    ],
    Science: [
      ["7:40", "Assembly on the quad"],
      ["8:00", "Chemistry practical · double"],
      ["9:20", "Further mathematics"],
      ["10:00", "Break"],
      ["10:20", "Physics"],
      ["11:40", "Biology"],
      ["12:20", "English language"],
      ["13:00", "Lunch & prep"],
    ],
    Arts: [
      ["7:40", "Assembly on the quad"],
      ["8:00", "Literature in English · double"],
      ["9:20", "Government"],
      ["10:00", "Break"],
      ["10:20", "History"],
      ["11:40", "Yoruba"],
      ["12:20", "Mathematics"],
      ["13:00", "Lunch & debate club"],
    ],
    Commercial: [
      ["7:40", "Assembly on the quad"],
      ["8:00", "Financial accounting · double"],
      ["9:20", "Economics"],
      ["10:00", "Break"],
      ["10:20", "Commerce"],
      ["11:40", "Mathematics"],
      ["12:20", "English language"],
      ["13:00", "Lunch & enterprise club"],
    ],
  }) as Record<StreamKey, [string, string][]>;
