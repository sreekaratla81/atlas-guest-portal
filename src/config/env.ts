export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string | undefined,
};

export function requireEnv(name: keyof typeof ENV) {
  const val = ENV[name];
  if (!val) {
    // Surface a loud error in dev
    // eslint-disable-next-line no-console
    console.error(`[ENV] Missing ${name}. Set it in .env.local`);
  }
  return val ?? '';
}
