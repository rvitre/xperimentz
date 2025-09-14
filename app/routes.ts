import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("optical-illusion", "routes/optical-illusion.tsx"),
  route(
    "motion-induced-blindness",
    "routes/motion-induced-blindness.tsx"
  ),
  route("hermann-grid", "routes/hermann-grid.tsx"),
] satisfies RouteConfig;
