import type { Route } from "./+types/optical-illusion";
import { CafeWallDemo } from "../../experiments/cafe-wall/CafeWall";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Optical Illusion • Xperimentz" },
    { name: "description", content: "First visual experiment: Optical Illusion" },
  ];
}

export default function OpticalIllusion() {
  return (
    <main className="container mx-auto pt-16 p-4">
      <h1 className="text-3xl font-semibold">Optical Illusion</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Café Wall illusion — adjust sliders to amplify the effect.
      </p>

      <div className="mt-8">
        <CafeWallDemo />
      </div>
    </main>
  );
}
