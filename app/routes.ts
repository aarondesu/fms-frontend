import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // Admin,
  ...prefix("admin", [
    route("/login", "routes/admin/login.tsx"),
    layout("routes/admin/layout.tsx", [
      index("routes/admin/dashboard.tsx"),
      route("/admins", "routes/admin/admins.tsx"),
      route("/settings", "routes/admin/settings.tsx"),
      route("/services", "routes/admin/services.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
