import type { Route } from "./+types/hermann-grid";
import { HermannGrid } from "../../experiments/hermann-grid/HermannGrid";

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
    <main className="container mx-auto pt-16 p-4">
      <h1 className="text-3xl font-semibold">Hermann Grid</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Observe phantom gray spots at the intersections. Adjust the sliders to vary the effect.
      </p>

      <div className="mt-8">
        <HermannGrid />
      </div>
    </main>
  );
}
