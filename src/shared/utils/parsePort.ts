export const DEFAULT_PORT = 3000;

export default function parsePort(port?: string): number {
  if (!port) {
    return DEFAULT_PORT;
  }

  return Number.parseInt(port, 10) || DEFAULT_PORT;
}
