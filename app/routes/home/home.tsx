import type { Route } from "./+types/home";
import { Link } from "react-router";
import {
  bodyText,
  listGrid,
  pageHeading,
  pageShell,
  sectionWrapper,
  surface,
} from "../../styles/primitives";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Xperimentz" },
    {
      name: "description",
      content: "A portfolio of interactive experiments.",
    },
  ];
}

export default function Home() {
  return (
    <main className={pageShell()}>
      <h1 className={pageHeading({ level: "hero" })}>Xperimentz</h1>
      <p className={bodyText({ margin: "md" })}>
        A growing collection of visual and interactive experiments.
      </p>

      <section className={sectionWrapper({ spacing: "lg" })}>
        <h2 className={pageHeading({ level: "section" })}>Experiments</h2>
        <ul className={listGrid()}>
          <li>
            <Link
              to="/optical-illusion"
              className={surface({ padding: "md", interactive: true, class: "block" })}
            >
              <div className={pageHeading({ level: "item" })}>Optical Illusion</div>
              <div className={bodyText({ size: "sm", tone: "subtle", margin: "sm" })}>
                First experiment sandbox.
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/motion-induced-blindness"
              className={surface({ padding: "md", interactive: true, class: "block" })}
            >
              <div className={pageHeading({ level: "item" })}>Motion-Induced Blindness</div>
              <div className={bodyText({ size: "sm", tone: "subtle", margin: "sm" })}>
                Rotating mask causing target disappearance.
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/hermann-grid"
              className={surface({ padding: "md", interactive: true, class: "block" })}
            >
              <div className={pageHeading({ level: "item" })}>Hermann Grid</div>
              <div className={bodyText({ size: "sm", tone: "subtle", margin: "sm" })}>
                Classic grid illusion with phantom spots.
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
