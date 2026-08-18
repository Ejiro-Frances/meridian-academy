import { describe, expect, it } from "vitest";

import { site, siteContentSchema } from "@/content/site";

describe("site content", () => {
  it("parses the shipped content", () => {
    expect(site.name.monogram).toBe("MA");
    expect(site.nav).toHaveLength(5);
    expect(site.nav.map((n) => n.href)).toEqual([
      "/",
      "/academics",
      "/campus",
      "/people",
      "/admissions",
    ]);
  });

  it("rejects malformed content at parse time", () => {
    expect(() =>
      siteContentSchema.parse({ name: { first: "", second: "", monogram: "" } }),
    ).toThrow();
    expect(() =>
      siteContentSchema.parse({
        ...site,
        nav: [{ label: "Home", href: "no-leading-slash" }],
      }),
    ).toThrow();
  });
});
