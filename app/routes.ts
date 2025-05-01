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
      ...prefix("/admins", [index("routes/admin/admins/index.tsx")]),
      route("/settings", "routes/admin/settings.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
