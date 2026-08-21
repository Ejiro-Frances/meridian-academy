import { z } from "zod";

/** Placeholder teacher name pool — replace wholesale with a real staff table. */
export const teacherNames: string[] = z
  .array(z.string().min(1))
  .length(40)
  .parse([
    "Adaeze Nwachukwu",
    "Segun Bello",
    "Halima Yusuf",
    "Chidi Okonkwo",
    "Funke Adeyemi",
    "Emeka Obi",
    "Zainab Lawal",
    "Tunde Ogunleye",
    "Ngozi Eze",
    "Ibrahim Sanni",
    "Bukola Ariyo",
    "Kelechi Nnaji",
    "Aisha Bakare",
    "Femi Alabi",
    "Ifeoma Udeh",
    "Musa Danjuma",
    "Yewande Salami",
    "Obinna Chukwu",
    "Hauwa Garba",
    "Damilola Ojo",
    "Chiamaka Iwu",
    "Suleiman Abdul",
    "Temitope Fadipe",
    "Nkem Anozie",
    "Rukayat Oladele",
    "Peter Ekanem",
    "Blessing Umoh",
    "Sadiq Bello",
    "Olamide Balogun",
    "Grace Etim",
    "Kabiru Idris",
    "Amaka Nwosu",
    "Seyi Adewale",
    "Fatima Umar",
    "Chinedu Agu",
    "Toyin Ayoola",
    "Uche Nwafor",
    "Maryam Shehu",
    "Bode Ogunsola",
    "Ijeoma Kalu",
  ]);

export const duties: string[] = [
  "Club lead",
  "Exams officer",
  "Sports duty",
  "Library duty",
  "Bus duty",
  "House master",
  "House mistress",
  "Counselling",
  "Prefects liaison",
  "ICT support",
];

const staffRoomSchema = z.object({
  id: z.enum(["iroko", "ridge", "grove"]),
  name: z.string().min(1),
  where: z.string().min(1),
  count: z.number().int().positive(),
  arms: z.number().int().positive(),
  coordinator: z.string().min(1),
  icon: z.string().min(1),
});

export type StaffRoom = z.infer<typeof staffRoomSchema>;
export type StaffRoomId = StaffRoom["id"];

export const staffRooms: StaffRoom[] = z
  .array(staffRoomSchema)
  .length(3)
  .parse([
    {
      id: "iroko",
      name: "Ìrókò staff room",
      where: "Block B · ground floor",
      count: 24,
      arms: 10,
      coordinator: "Mrs Bukola Ariyo",
      icon: "sprout",
    },
    {
      id: "ridge",
      name: "Ọ̀ṣun staff room",
      where: "Block C · first floor",
      count: 26,
      arms: 12,
      coordinator: "Mr Kelechi Nnaji",
      icon: "mountain",
    },
    {
      id: "grove",
      name: "Grove staff room",
      where: "Block B · first floor",
      count: 14,
      arms: 20,
      coordinator: "Mr Chinedu Agu",
      icon: "flask-conical",
    },
  ]);

export const totalTeachingStaff = staffRooms.reduce((n, r) => n + r.count, 0);
