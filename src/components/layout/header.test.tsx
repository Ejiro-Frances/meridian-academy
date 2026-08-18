import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Header } from "@/components/layout/header";
import { site } from "@/content/site";

vi.mock("next/navigation", () => ({
  usePathname: () => "/academics",
}));

describe("Header", () => {
  it("renders every nav route and the booking CTA", () => {
    render(<Header />);

    for (const { label, href } of site.nav) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
    expect(screen.getByRole("link", { name: /book a tour/i })).toHaveAttribute(
      "href",
      "/admissions",
    );
  });

  it("links the logo home", () => {
    render(<Header />);
    const homeLinks = screen.getAllByRole("link").filter((l) => l.getAttribute("href") === "/");
    expect(homeLinks.length).toBeGreaterThanOrEqual(2); // logo + Home nav item
  });
});
