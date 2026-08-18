import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-310 flex-1 px-7 py-20">
      <Badge>A secondary school that sets the pace</Badge>
      <h1 className="mt-4 max-w-xl text-6xl font-extrabold tracking-[-0.035em] text-strong">
        Deep roots. High reach.
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
        {site.positioning}
      </p>
      <p className="mt-10 font-mono text-sm text-subtle">Full home page under construction.</p>
    </main>
  );
}
