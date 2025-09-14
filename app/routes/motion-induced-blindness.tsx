import type { Route } from "./+types/motion-induced-blindness";
import { MotionInducedBlindness } from "../experiments/mib";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Motion-Induced Blindness • Xperimentz" },
    {
      name: "description",
      content:
        "Targets disappear intermittently when masked by rotating motion.",
    },
  ];
}

export default function MIBRoute() {
  return (
    <main className="container mx-auto pt-16 p-4">
      <h1 className="text-3xl font-semibold">Motion-Induced Blindness</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Fixate on the center cross. The yellow dots may vanish while the blue mask rotates.
      </p>

      <div className="mt-8">
        <MotionInducedBlindness />
      </div>
    </main>
  );
}

