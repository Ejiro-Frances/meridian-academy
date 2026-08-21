import { duties, staffRooms, teacherNames, type StaffRoomId } from "@/content/staff";
import { juniorSubjects } from "@/content/subjects";
import { hash, honorific } from "@/lib/hash";

export type StaffMember = { name: string; subject: string; duty: string };

const seniorSubjects = [
  "Literature in English",
  "Government",
  "Economics",
  "Mathematics",
  "English language",
  "History",
  "Financial accounting",
  "Geography",
  "Commerce",
  "French",
];

const scienceSubjects = [
  "Physics",
  "Chemistry",
  "Biology",
  "Computer studies",
  "Basic technology",
  "Agricultural science",
  "Technical drawing",
];

/** Synthesizes each room's roster deterministically from the name pool.
 * Placeholder data — replace wholesale with a real staff table. */
export function staffFor(roomId: StaffRoomId): StaffMember[] {
  const room = staffRooms.find((r) => r.id === roomId) ?? staffRooms[0];
  const start = roomId === "iroko" ? 0 : roomId === "ridge" ? 12 : 26;
  const subjPool =
    roomId === "grove" ? scienceSubjects : roomId === "iroko" ? juniorSubjects : seniorSubjects;

  const pool: StaffMember[] = [];
  for (let i = 0; i < room.count; i++) {
    const name = teacherNames[(start + i) % teacherNames.length];
    pool.push({
      name: honorific(name),
      subject: subjPool[(hash(name) + i) % subjPool.length],
      duty: duties[(hash(name) + i) % duties.length],
    });
  }
  return pool;
}
