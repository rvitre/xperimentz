import type { Route } from "./+types/home";
import { Link } from "react-router";

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
    <main className="container mx-auto pt-16 p-4">
      <h1 className="text-4xl font-semibold tracking-tight">Xperimentz</h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        A growing collection of visual and interactive experiments.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-medium">Experiments</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          <li>
            <Link
              to="/optical-illusion"
              className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="font-medium">Optical Illusion</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                First experiment sandbox.
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/motion-induced-blindness"
              className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="font-medium">Motion-Induced Blindness</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Rotating mask causing target disappearance.
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/hermann-grid"
              className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="font-medium">Hermann Grid</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Classic grid illusion with phantom spots.
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
