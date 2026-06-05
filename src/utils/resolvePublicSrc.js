export function resolvePublicSrc(src) {
  if (!src?.startsWith("/")) return src;

  const base = import.meta.env.BASE_URL || "/";
  if (base === "/") return src;

  return `${base.replace(/\/$/, "")}${src}`;
}
