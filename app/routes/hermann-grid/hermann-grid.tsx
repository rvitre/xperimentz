import type { Route } from "./+types/hermann-grid";
import { HermannGrid } from "../../experiments/HermallGrid/HermannGrid";
import { bodyText, pageHeading, pageShell, sectionWrapper } from "../../styles/primitives";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hermann Grid • Xperimentz" },
    {
      name: "description",
      content: "Classic Hermann grid illusion shown with adjustable parameters.",
    },
  ];
}

export default function HermannGridRoute() {
  return (
    <main className={pageShell()}>
      <h1 className={pageHeading({ level: "page" })}>Hermann Grid</h1>
      <p className={bodyText({ margin: "lg" })}>
        Observe phantom gray spots at the intersections. Adjust the sliders to vary the effect.
      </p>

      <div className={sectionWrapper()}>
        <HermannGrid />
      </div>
    </main>
  );
}
