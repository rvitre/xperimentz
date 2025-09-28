import { tv } from "tailwind-variants";

export const pageShell = tv({
  base: "container mx-auto pt-16 p-4",
});

export const pageHeading = tv({
  base: "",
  variants: {
    level: {
      hero: "text-4xl font-semibold tracking-tight",
      page: "text-3xl font-semibold",
      section: "text-xl font-medium",
      item: "font-medium",
    },
  },
  defaultVariants: {
    level: "page",
  },
});

export const bodyText = tv({
  base: "text-gray-600 dark:text-gray-300",
  variants: {
    margin: {
      none: "",
      sm: "mt-1",
      md: "mt-3",
      lg: "mt-4",
    },
    size: {
      base: "",
      sm: "text-sm",
      xs: "text-xs",
    },
    tone: {
      muted: "",
      subtle: "text-gray-500 dark:text-gray-400",
    },
  },
  defaultVariants: {
    margin: "none",
    size: "base",
    tone: "muted",
  },
});

export const sectionWrapper = tv({
  base: "",
  variants: {
    spacing: {
      md: "mt-8",
      lg: "mt-10",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

export const listGrid = tv({
  base: "grid gap-4 sm:grid-cols-2",
  variants: {
    spacing: {
      none: "",
      sm: "mt-4",
    },
  },
  defaultVariants: {
    spacing: "sm",
  },
});

export const surface = tv({
  base: "rounded-xl border border-gray-200 dark:border-gray-800",
  variants: {
    padding: {
      none: "",
      sm: "p-4",
      md: "p-5",
    },
    tone: {
      default: "",
      contrast: "bg-black",
      subtle: "bg-white dark:bg-gray-900",
    },
    overflow: {
      visible: "",
      auto: "overflow-auto",
    },
    interactive: {
      true: "transition-shadow hover:shadow-sm",
      false: "",
    },
    width: {
      full: "max-w-full",
    },
  },
  defaultVariants: {
    padding: "sm",
    tone: "default",
    interactive: false,
  },
});

export const splitLayout = tv({
  base: "grid gap-6 md:grid-cols-[1fr_auto] items-start",
});

export const canvasSurface = tv({
  base: "block max-w-full h-auto",
});

export const formPanel = tv({
  base: "space-y-4 rounded-xl border border-gray-200 dark:border-gray-800 p-4",
});

export const button = tv({
  base: "rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm transition-colors",
  variants: {
    active: {
      true: "border-transparent bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
      false: "",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const labelRow = tv({
  base: "flex items-center justify-between",
});

export const labelText = tv({
  base: "text-sm font-medium",
});

export const valueText = tv({
  base: "text-xs text-gray-500 dark:text-gray-400 tabular-nums",
});

export const rangeInput = tv({
  base: "w-full",
});

export const sliderRoot = tv({
  base: "flex flex-col gap-2",
});

export const sliderTrack = tv({
  base: "relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden",
});

export const sliderTrackHighlight = tv({
  base: "absolute left-0 top-0 h-full rounded-full bg-gray-900 dark:bg-gray-100",
});

export const sliderThumb = tv({
  base: "block h-4 w-4 rounded-full border border-gray-300 bg-white shadow transition-transform data-[dragging=true]:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-gray-600 dark:bg-gray-100",
});

export const checkboxLabel = tv({
  base: "flex items-center gap-2 text-sm",
});

export const codeBlock = tv({
  base: "w-full p-4 overflow-x-auto",
});
