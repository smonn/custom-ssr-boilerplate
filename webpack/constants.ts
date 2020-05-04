import path from "path";

export const DEV = process.env.NODE_ENV !== "production";

export const SRC = path.resolve(process.cwd(), "src");

export const DIST = path.resolve(process.cwd(), "dist");
