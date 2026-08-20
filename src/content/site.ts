import { z } from "zod";

export const siteContentSchema = z.object({
  name: z.object({
    first: z.string().min(1),
    second: z.string().min(1),
    monogram: z.string().min(1).max(2),
  }),
  locationLine: z.string().min(1),
  positioning: z.string().min(1),
  nav: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().startsWith("/"),
      }),
    )
    .length(5),
  cta: z.object({
    label: z.string().min(1),
    href: z.string().startsWith("/"),
  }),
  visit: z.object({
    address: z.string().min(1),
    phone: z.string().min(1),
  }),
  imageNote: z.string().min(1),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

// Placeholder content pending real school data — see the design handoff's
// "Fictional content" note. Malformed content must fail the build, not the
// browser, so this module parses at load.
export const site: SiteContent = siteContentSchema.parse({
  name: { first: "Meridian", second: "Academy", monogram: "MA" },
  locationLine: "Ibadan · Est. 1998",
  positioning:
    "A co-educational secondary school in Ibadan — small classes, serious science, and a campus you can inspect before you visit.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Academics", href: "/academics" },
    { label: "Campus tour", href: "/campus" },
    { label: "People", href: "/people" },
    { label: "Admissions", href: "/admissions" },
  ],
  cta: { label: "Book a tour", href: "/admissions" },
  visit: {
    address: "1 Meridian Drive, off Old Ife Road, Ibadan, Oyo State",
    phone: "+234 803 000 1998",
  },
  imageNote: "Photographs are placeholders until real campus photography lands.",
});
