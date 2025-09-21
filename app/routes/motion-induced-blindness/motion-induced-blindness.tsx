import type { Route } from "./+types/motion-induced-blindness";
import { MotionInducedBlindness } from "../../experiments/motion-induced-blindness/MotionInducedBlindness";
import { bodyText, pageHeading, pageShell, sectionWrapper } from "../../styles/primitives";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Motion-Induced Blindness • Xperimentz" },
    {
      name: "description",
      content: "Targets disappear intermittently when masked by rotating motion.",
    },
  ];
}

export default function MotionInducedBlindnessRoute() {
  return (
    <main className={pageShell()}>
      <h1 className={pageHeading({ level: "page" })}>Motion-Induced Blindness</h1>
      <p className={bodyText({ margin: "lg" })}>
        Dive into a motion-induced blindness simulation where rotating masks hide stationary targets.
      </p>

      <div className={sectionWrapper()}>
        <MotionInducedBlindness />
      </div>
    </main>
  );
}
