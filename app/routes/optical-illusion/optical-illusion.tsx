﻿import type { Route } from "./+types/optical-illusion";
import { CafeWallDemo } from "../../experiments/cafe-wall/CafeWall";
import { bodyText, pageHeading, pageShell, sectionWrapper } from "../../styles/primitives";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Optical Illusion • Xperimentz" },
    { name: "description", content: "First visual experiment: Optical Illusion" },
  ];
}

export default function OpticalIllusion() {
  return (
    <main className={pageShell()}>
      <h1 className={pageHeading({ level: "page" })}>Optical Illusion</h1>
      <p className={bodyText({ margin: "lg" })}>
        Café Wall illusion — adjust sliders to amplify the effect.
      </p>

      <div className={sectionWrapper()}>
        <CafeWallDemo />
      </div>
    </main>
  );
}
