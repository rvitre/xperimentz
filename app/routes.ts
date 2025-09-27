import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("cafe-wall", "routes/cafe-wall/cafe-wall.tsx"),
  route(
    "motion-induced-blindness",
    "routes/motion-induced-blindness/motion-induced-blindness.tsx"
  ),
  route("hermann-grid", "routes/hermann-grid/hermann-grid.tsx"),
] satisfies RouteConfig;
