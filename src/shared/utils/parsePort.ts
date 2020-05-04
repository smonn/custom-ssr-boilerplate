export const DEFAULT_PORT = 3000;

export default function parsePort(port?: string) {
  if (!port) {
    return DEFAULT_PORT;
  }

  return Number.parseInt(port, 10) || DEFAULT_PORT;
}
