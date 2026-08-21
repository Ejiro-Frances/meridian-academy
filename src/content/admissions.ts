import { z } from "zod";

const stepSchema = z.object({
  n: z.string().min(1),
  t: z.string().min(1),
  icon: z.string().min(1),
  b: z.string().min(1),
  when: z.string().min(1),
});

export type AdmissionStep = z.infer<typeof stepSchema>;

export const admissionSteps: AdmissionStep[] = z
  .array(stepSchema)
  .length(5)
  .parse([
    {
      n: "1",
      t: "Enquire",
      icon: "mail",
      b: "Send the form or call the office. We reply with a prospectus and a fee schedule.",
      when: "Any time",
    },
    {
      n: "2",
      t: "Visit",
      icon: "footprints",
      b: "An open morning or a private tour. You sit in a real lesson, not a showcase.",
      when: "Sep – Jan",
    },
    {
      n: "3",
      t: "Assess",
      icon: "pencil-line",
      b: "Two papers and a short conversation. JSS 1 entrants also read aloud.",
      when: "February",
    },
    {
      n: "4",
      t: "Offer",
      icon: "badge-check",
      b: "Results and arm placement within ten working days, with the deposit deadline.",
      when: "March",
    },
    {
      n: "5",
      t: "Start",
      icon: "backpack",
      b: "Induction week, uniform fitting and a first meeting with your form teacher.",
      when: "September",
    },
  ]);

const contactSchema = z.object({
  k: z.string().min(1),
  icon: z.string().min(1),
  v: z.string().min(1),
});

export type OfficeContact = z.infer<typeof contactSchema>;

export const officeContacts: OfficeContact[] = z
  .array(contactSchema)
  .length(4)
  .parse([
    { k: "Admissions", icon: "mail", v: "admissions@meridianacademy.edu.ng" },
    { k: "Parents’ line", icon: "phone", v: "+234 803 411 0219" },
    { k: "Address", icon: "map-pin", v: "12 Akinyele Road, Ibadan, Oyo State" },
    { k: "Office hours", icon: "clock", v: "Mon – Fri, 7:30 am – 4:00 pm" },
  ]);

export const feeDisclaimer =
  "Uniform, textbooks and the one-off ₦180,000 new-student levy are billed separately in the first term only. Fees are frozen for the whole session once a place is accepted.";
